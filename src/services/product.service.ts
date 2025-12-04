import { Product, products } from '../models/product.model';

export class ProductService {
  static getAll(): Product[] {
    return products;
  }

  static getById(id: number): Product {
    const product = products.find(p => p.id === id);
    if (!product) throw new Error('Produk dengan ID tersebut tidak ditemukan');
    return product;
  }

  static create(data: { 
    nama: string; 
    deskripsi: string; 
    harga: number; 
    stok: number; // <-- TAMBAHAN
  }): Product {
    // Validasi stok positif
    if (data.stok < 0) {
      throw new Error('Stok tidak boleh negatif');
    }
    
    const newProduct = {
      id: products.length + 1,
      ...data
    };
    products.push(newProduct);
    return newProduct;
  }

  static update(id: number, data: Partial<Product>): Product {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Produk tidak ditemukan');
    
    // Validasi stok jika diupdate
    if (data.stok !== undefined && data.stok < 0) {
      throw new Error('Stok tidak boleh negatif');
    }
    
    products[index] = { ...products[index], ...data };
    return products[index];
  }

  static delete(id: number): Product {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Produk tidak ditemukan');
    return products.splice(index, 1)[0];
  }

  // Fitur search yang diminta di tugas
  static search(name?: string, maxPrice?: number): Product[] {
    let result = products;
    if (name) {
      result = result.filter(p => p.nama.toLowerCase().includes(name.toLowerCase()));
    }
    if (maxPrice) {
      result = result.filter(p => p.harga <= maxPrice);
    }
    return result;
  }

  // TAMBAHAN: Fitur untuk mengurangi stok (untuk transaksi)
  static reduceStock(id: number, quantity: number): Product {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Produk tidak ditemukan');
    
    if (products[index].stok < quantity) {
      throw new Error('Stok tidak mencukupi');
    }
    
    products[index].stok -= quantity;
    return products[index];
  }
}