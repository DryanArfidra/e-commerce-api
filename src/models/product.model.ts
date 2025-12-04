export interface Product {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
  stok: number;
}

export let products: Product[] = [
  { 
    id: 1, 
    nama: "Laptop Gaming", 
    deskripsi: "Intel i7, RTX 3060", 
    harga: 15000000,
    stok: 10 
  },
  { 
    id: 2, 
    nama: "Keyboard Mekanikal", 
    deskripsi: "Blue Switch, RGB", 
    harga: 800000,
    stok: 25 
  },
  { 
    id: 3, 
    nama: "Mouse Wireless", 
    deskripsi: "Ergonomic, Silent Click", 
    harga: 300000,
    stok: 50 
  }
];