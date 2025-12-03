import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { body, param, query, validationResult, ValidationChain } from 'express-validator';

dotenv.config();

// config express
const app = express();
const PORT = process.env.PORT || 5000;

interface CustomRequest extends Request {
  startTime?: number;
}

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Custom Middleware – Tambah timestamp ke setiap request
app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  console.log(`Request masuk: ${req.method} ${req.path}`);
  req.startTime = Date.now();
  next();
});

// Custom Middleware – Cek apakah ada header X-API-Key (simulasi autentikasi)
app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: "Header X-API-Key wajib diisi untuk akses API!",
      timestamp: new Date().toISOString()
    });
  }
  // Simulasi validasi API key (dalam produksi, cek ke database)
  if (apiKey !== 'secret-api-key-123') {
    return res.status(403).json({
      success: false,
      message: "API Key tidak valid!",
      timestamp: new Date().toISOString()
    });
  }
  next();
});

interface Product {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
}

let products: Product[] = [
  { id: 1, nama: "Laptop Gaming", deskripsi: "Intel i7, RTX 3060", harga: 15000000 },
  { id: 2, nama: "Keyboard Mekanikal", deskripsi: "Blue Switch, RGB", harga: 800000 },
  { id: 3, nama: "Mouse Wireless", deskripsi: "Ergonomic, Silent Click", harga: 300000 }
];

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
  errors?: Array<{
    field: string;
    message: string;
  }> | { stack?: string };
  processingTime?: number;
  timestamp?: string;
}

// Success Response Helper dengan waktu proses
const successResponse = (
  res: Response,
  message: string,
  data: unknown = null,
  pagination: { page: number; limit: number; total: number } | null = null,
  statusCode: number = 200,
  processingTime?: number
) => {
  const response: ApiResponse = {
    success: true,
    message,
    timestamp: new Date().toISOString()
  };

  if (data !== null) response.data = data;
  if (pagination) response.pagination = pagination;
  if (processingTime !== undefined) response.processingTime = processingTime;

  return res.status(statusCode).json(response);
};

// Error Response Helper dengan waktu proses
const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 400,
  errors: Array<{ field: string; message: string }> | { stack?: string } | null = null,
  processingTime?: number
) => {
  const response: ApiResponse = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };

  if (errors) response.errors = errors;
  if (processingTime !== undefined) response.processingTime = processingTime;

  return res.status(statusCode).json(response);
};

const validate = (validations: ValidationChain[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const processingTime = req.startTime ? Date.now() - req.startTime : undefined;
    const errorList = errors.array().map(err => ({
      field: err.type === 'field' ? err.path : 'unknown',
      message: err.msg
    }));

    return errorResponse(res, 'Validasi gagal', 400, errorList, processingTime);
  };
};

// Validasi untuk CREATE & UPDATE produk
const createProductValidation = [
  body('nama')
    .trim()
    .notEmpty().withMessage('Nama produk wajib diisi')
    .isLength({ min: 3 }).withMessage('Nama produk minimal 3 karakter'),
  
  body('deskripsi')
    .trim()
    .notEmpty().withMessage('Deskripsi wajib diisi'),
  
  body('harga')
    .isNumeric().withMessage('Harga harus angka')
    .custom(value => value > 0).withMessage('Harga harus lebih dari 0')
];

// Validasi untuk GET by ID produk
const getProductByIdValidation = [
  param('id')
    .isNumeric().withMessage('ID harus angka')
];

// Async Handler untuk menangani error di async function
const asyncHandler = (fn: Function) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 1. ROUTE GET – Home
app.get('/', (req: CustomRequest, res: Response) => {
  const waktuProses = Date.now() - (req.startTime || Date.now());
  successResponse(res, 'API E-Commerce – Hari 4', {
    message: 'selamat datang di e-commerce',
    hari: 4,
    status: "Server hidup!",
    note: "Gunakan header X-API-Key: secret-api-key-123 untuk mengakses API"
  }, null, 200, waktuProses);
});

// 2. ROUTE GET – Tampilkan semua produk
app.get('/api/products', (req: CustomRequest, res: Response) => {
  const waktuProses = Date.now() - (req.startTime || Date.now());
  successResponse(res, 'Daftar produk', products, null, 200, waktuProses);
});

// 3. ROUTE GET – Cari berdasarkan ID (Route Params)
app.get('/api/products/:id', validate(getProductByIdValidation), (req: CustomRequest, res: Response) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    throw new Error('Produk dengan ID tersebut tidak ditemukan');
  }

  const waktuProses = Date.now() - (req.startTime || Date.now());
  successResponse(res, 'Produk ditemukan', product, null, 200, waktuProses);
});

// 4. ROUTE GET – Filter dengan Query String
app.get('/api/search', (req: CustomRequest, res: Response) => {
  const { name, max_price } = req.query;
  const waktuProses = Date.now() - (req.startTime || Date.now());

  let result = products;

  if (name) {
    result = result.filter(p => 
      p.nama.toLowerCase().includes((name as string).toLowerCase())
    );
  }

  if (max_price) {
    result = result.filter(p => p.harga <= Number(max_price));
  }

  successResponse(res, 'Hasil pencarian', result, null, 200, waktuProses);
});

// 5. ROUTE POST – Tambah produk baru
app.post('/api/products', validate(createProductValidation), (req: CustomRequest, res: Response) => {
  const { nama, deskripsi, harga } = req.body;

  const newProduct: Product = {
    id: products.length + 1,
    nama,
    deskripsi,
    harga: Number(harga)
  };

  products.push(newProduct);

  const waktuProses = Date.now() - (req.startTime || Date.now());
  successResponse(res, 'Produk berhasil ditambahkan', newProduct, null, 201, waktuProses);
});

// 6. ROUTE PUT – Update produk
app.put('/api/products/:id', (req: CustomRequest, res: Response) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  const waktuProses = Date.now() - (req.startTime || Date.now());

  if (index === -1) {
    return errorResponse(res, 'Produk tidak ditemukan', 404, null, waktuProses);
  }

  products[index] = { ...products[index], ...req.body };

  successResponse(res, 'Produk berhasil diupdate', products[index], null, 200, waktuProses);
});

// 7. ROUTE DELETE – Hapus produk
app.delete('/api/products/:id', (req: CustomRequest, res: Response) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  const waktuProses = Date.now() - (req.startTime || Date.now());

  if (index === -1) {
    return errorResponse(res, 'Produk tidak ditemukan', 404, null, waktuProses);
  }

  const deleted = products.splice(index, 1);

  successResponse(res, 'Produk berhasil dihapus', deleted[0], null, 200, waktuProses);
});

// ==================== ROUTE BARU SESUAI TUGAS ====================

// 8. ROUTE GET – Error Test (sengaja lempar error)
app.get('/api/error-test', (req: CustomRequest, res: Response) => {
  const waktuProses = Date.now() - (req.startTime || Date.now());
  // Sengaja lempar error untuk testing
  throw new Error('Ini adalah error yang sengaja dibuat untuk testing global error handler');
});

// 9. ROUTE GET – Async Test dengan asyncHandler
app.get('/api/async-test', asyncHandler(async (req: CustomRequest, res: Response) => {
  // Simulasi async operation dengan delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulasi error secara kondisional
  const shouldFail = req.query.fail === 'true';
  if (shouldFail) {
    throw new Error('Async operation sengaja gagal!');
  }
  
  const waktuProses = Date.now() - (req.startTime || Date.now());
  successResponse(res, "Async operation berhasil!", {
    simulatedDelay: "500ms",
    note: "Coba akses dengan ?fail=true untuk melihat error handling"
  }, null, 200, waktuProses);
}));

// ==================== ERROR HANDLING ====================

// 404 Handler - Route tidak ditemukan
app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  const waktuProses = req.startTime ? Date.now() - req.startTime : undefined;
  throw new Error(`Route ${req.method} ${req.originalUrl} tidak ditemukan`);
});

// Global Error Handler
app.use((err: Error, req: CustomRequest, res: Response, next: NextFunction) => {
  console.error('ERROR:', err.message);
  
  const waktuProses = req.startTime ? Date.now() - req.startTime : undefined;
  
  // Tentukan status code berdasarkan pesan error
  let statusCode = 500;
  if (err.message.includes('tidak ditemukan')) statusCode = 404;
  if (err.message.includes('Validasi gagal')) statusCode = 400;
  if (err.message.includes('wajib diisi')) statusCode = 400;

  // Response error dengan detail
  errorResponse(
    res, 
    err.message || 'Terjadi kesalahan server', 
    statusCode,
    process.env.NODE_ENV === 'development' ? { stack: err.stack } : null,
    waktuProses
  );
});

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
  console.log(`📚 Dokumentasi Route:`);
  console.log(`   GET  /                 - Home`);
  console.log(`   GET  /api/products     - Semua produk`);
  console.log(`   GET  /api/products/:id - Produk by ID`);
  console.log(`   GET  /api/search       - Search produk`);
  console.log(`   POST /api/products     - Tambah produk`);
  console.log(`   PUT  /api/products/:id - Update produk`);
  console.log(`   DELETE /api/products/:id - Hapus produk`);
  console.log(`   GET  /api/error-test   - Test error handler`);
  console.log(`   GET  /api/async-test   - Test async handler`);
  console.log(`\n🔑 Header yang diperlukan: X-API-Key: secret-api-key-123`);
});