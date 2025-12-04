import { Category, categories } from '../models/category.model';

export class CategoryService {
  static getAll(): Category[] {
    return categories;
  }

  static create(data: { nama: string }): Category {
    const newCategory = {
      id: categories.length + 1,
      ...data
    };
    categories.push(newCategory);
    return newCategory;
  }

  static delete(id: number): Category {
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Kategori dengan ID tersebut tidak ditemukan');
    
    // Cek apakah kategori digunakan oleh produk? (jika ada relasi)
    // Jika ada relasi, tambahkan pengecekan di sini
    
    return categories.splice(index, 1)[0];
  }
}