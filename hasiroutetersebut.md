# get /
{
    "message": "Selamat datang di API E-Commerce!",
    "hari": 3,
    "status": "Server nyala"
}

# get /api/products
{
    "success": true,
    "jumlah": 4,
    "data": [
        {
            "id": 1,
            "nama": "Laptop Gaming",
            "deskripsi": "Intel i7, RTX 3060",
            "harga": 15000000
        },
        {
            "id": 2,
            "nama": "Kipas Angin",
            "deskripsi": "Kipas Angin Portable",
            "harga": 150000
        },
        {
            "id": 3,
            "nama": "Mouse Wireless",
            "deskripsi": "Ergonomic, Silent Click",
            "harga": 300000
        },
        {
            "id": 4,
            "nama": "Monitor 4K",
            "deskripsi": "27 inch, IPS panel",
            "harga": 100000
        }
    ]
}
# get /api/products/3
{
    "success": true,
    "data": {
        "id": 3,
        "nama": "Mouse Wireless",
        "deskripsi": "Ergonomic, Silent Click",
        "harga": 300000
    }
}
# get /api/search?name=kipas
{
    "success": true,
    "filtered_result": [
        {
            "id": 2,
            "nama": "Kipas Angin",
            "deskripsi": "Kipas Angin Portable",
            "harga": 150000
        }
    ]
}
# post /api/products
{
    "success": true,
    "message": "Produk berhasil ditambahkan",
    "data": {
        "id": 7,
        "nama": "tumbler",
        "deskripsi": "botol minum 1,5l",
        "harga": 150000
    }
}
# put api/products/6
{
    "success": true,
    "message": "Produk berhasil diupdate",
    "data": {
        "id": 6,
        "nama": "misting",
        "deskripsi": "tempat makan",
        "harga": 250000
    }
}
# delete api/products/5
{
    "success": true,
    "message": "Produk berhasil dihapus",
    "data": {
        "id": 5,
        "nama": "Kipas Angin",
        "deskripsi": "Kipas Angin Portable",
        "harga": 150000
    }
}
# setelah di hapus
{
    "success": true,
    "jumlah": 6,
    "data": [
        {
            "id": 1,
            "nama": "Laptop Gaming",
            "deskripsi": "Intel i7, RTX 3060",
            "harga": 15000000
        },
        {
            "id": 2,
            "nama": "Kipas Angin",
            "deskripsi": "Kipas Angin Portable",
            "harga": 150000
        },
        {
            "id": 3,
            "nama": "Mouse Wireless",
            "deskripsi": "Ergonomic, Silent Click",
            "harga": 300000
        },
        {
            "id": 4,
            "nama": "Monitor 4K",
            "deskripsi": "27 inch, IPS panel",
            "harga": 100000
        },
        {
            "id": 6,
            "nama": "misting",
            "deskripsi": "tempat makan",
            "harga": 250000
        },
        {
            "id": 7,
            "nama": "tumbler",
            "deskripsi": "botol minum 1,5l",
            "harga": 150000
        }
    ]
}