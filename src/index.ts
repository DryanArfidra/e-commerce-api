import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

let products = [
  { id: 1, nama: "Laptop Gaming", deskripsi: "Intel i7, RTX 3060", harga: 15000000 },
  { id: 2, nama: "Keyboard Mekanikal", deskripsi: "Blue Switch, RGB", harga: 800000 },
  { id: 3, nama: "Mouse Wireless", deskripsi: "Ergonomic, Silent Click", harga: 300000 }
];

// 1. ROUTE GET – Home
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: "Selamat datang di API E-Commerce!",
    hari: 3, 
    status: "Server nyala"
  });
});

// 2. ROUTE GET – Tampilkan semua produk
app.get('/api/products', (req: Request, res: Response) => {
  res.json({
    success: true,
    jumlah: products.length,
    data: products
  });
});

// 3. ROUTE GET – Cari berdasarkan ID (Route Params)
app.get('/api/products/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Produk tidak ditemukan"
    });
  }

  return res.status(200).json({
    success: true,
    data: product
  });
});

// 4. ROUTE GET – Filter dengan Query String
app.get('/api/search', (req: Request, res: Response) => {
  const { name, max_price } = req.query;

  let result = products;

  if (name) {
    result = result.filter(p => 
      p.nama.toLowerCase().includes((name as string).toLowerCase())
    );
  }

  if (max_price) {
    result = result.filter(p => p.harga <= Number(max_price));
  }

  return res.status(200).json({
    success: true,
    filtered_result: result
  });
});

// 5. ROUTE POST – Tambah produk baru
app.post('/api/products', (req: Request, res: Response) => {
  const { nama, deskripsi, harga } = req.body;

  const newProduct = {
    id: products.length + 1,
    nama,
    deskripsi,
    harga: Number(harga)
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: "Produk berhasil ditambahkan",
    data: newProduct
  });
});

// 6. ROUTE PUT – Update produk
app.put('/api/products/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Produk tidak ada" });
  }
  products[index] = { ...products[index], ...req.body };

  res.json({
    success: true,
    message: "Produk berhasil diupdate",
    data: products[index]
  });
});

// 7. ROUTE DELETE – Hapus produk
app.delete('/api/products/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Produk tidak ada" });
  }

  const deleted = products.splice(index, 1);

  res.json({
    success: true,
    message: "Produk berhasil dihapus",
    data: deleted[0]
  });
});

app.listen(PORT, () => {
  console.log(`Server jalan → http://localhost:${PORT}`);
  console.log(`Coba buka semua route di atas pakai Postman!`);
});