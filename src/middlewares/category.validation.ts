import { body, param } from 'express-validator';

export const createCategoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Nama produk wajib diisi')
    .isLength({ min: 3 }).withMessage('Nama produk minimal 3 karakter'),
  
]
export const getCategoryByIdValidation = [
  param('id')
    .isNumeric().withMessage('ID harus angka')
];