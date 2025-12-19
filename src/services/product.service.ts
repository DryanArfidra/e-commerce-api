import  prisma  from '../prisma';
import type { Product } from '../generated/client';

interface FindAllParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const findAllProducts = async (params: FindAllParams) => {
  const { page, limit, search, sortBy, sortOrder } = params;
  
  const skip = (page - 1) * limit;

  // 1. Buat Filter (Where Clause)
  const whereClause: any = {
    deletedAt: null // Selalu filter yang belum dihapus (soft delete)
  };

  if (search) {
    whereClause.name = { contains: search, mode: 'insensitive' };
  }

  // 2. Ambil Data dengan Pagination & Sorting
  const products = await prisma.product.findMany({
    skip: skip,
    take: limit,
    where: whereClause,
    // Gunakan array untuk orderBy agar dinamis
    orderBy: sortBy ? { [sortBy]: sortOrder || 'desc' } : { createdAt: 'desc' },
    include: {
      category: true 
    }
  });

  // 3. Hitung Total Data (untuk metadata pagination)
  const totalItems = await prisma.product.count({
    where: whereClause
  });

  return {
    products,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: page
  };
};

export const getAllProducts = async (): Promise<Product[]> => {
  return await prisma.product.findMany({
    include: {
      category: true
    },
    where: {
      deletedAt: null,
    }
  });
};

export const getProductById = async (id: string): Promise<Product> => {
  const product = await prisma.product.findFirst({
    where: { id, deletedAt: null },
    include: {
      category: true
    }

  });
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  return product;
};

export const createProduct = async (data: { 
  name: string; 
  price: number; 
  stock: number;
  description?: string; 
  categoryId: string; 
  image?: string;

}): Promise<Product> => {
  return await prisma.product.create({
    data: {
      name: data.name,
      description: data.description ?? null,
      price: data.price,
      stock: data.stock,
      categoryId: data.categoryId,
      image: data.image ?? null,
    },
  });
};

export const updateProduct = async (id: string, data: Partial<Product>): Promise<Product> => {
  await getProductById(id); // Cek existance

  return await prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string): Promise<Product> => {
  await getProductById(id); // Cek existance

  return await prisma.product.update({
    where: { id },
    data: {
      deletedAt : new Date(),
    },
  });
};

export const searchProducts = async (name?: string, maxPrice?: number): Promise<Product[]> => {
  let result = await getAllProducts();
  if (name) {
    result = result.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  }
  if (maxPrice) {
    result = result.filter(p => p.price.toNumber() <= maxPrice);
  }
  return result;
};