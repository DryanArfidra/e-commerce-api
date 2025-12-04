import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { asyncHandler } from '../utils/async.handler';
import { successResponse } from '../utils/response';

export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = ProductService.getAll();
  return successResponse(res, 'Daftar produk', products);
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = ProductService.getById(id);
  return successResponse(res, 'Produk ditemukan', product);
});

// ... kode yang ada

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  try {
    const product = ProductService.create(req.body);
    return successResponse(res, 'Produk berhasil ditambahkan', product, null, 201);
  } catch (error: any) {
    // Handle error khusus untuk validasi stok
    if (error.message.includes('Stok tidak boleh negatif')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    throw error; 
  }
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = ProductService.update(id, req.body);
  return successResponse(res, 'Produk berhasil diupdate', product);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = ProductService.delete(id);
  return successResponse(res, 'Produk berhasil dihapus', product);
});

export const searchProducts = asyncHandler(async (req: Request, res: Response) => {
  const { name, max_price } = req.query;
  const products = ProductService.search(
    name as string, 
    max_price ? Number(max_price) : undefined
  );
  return successResponse(res, 'Hasil pencarian', products);
});

