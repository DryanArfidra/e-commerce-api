import { body, param } from 'express-validator';

export const createStoreValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Nama toko wajib diisi')
    .isLength({ min: 3 }).withMessage('Nama toko minimal 3 karakter'),
];

export const getStoreByIdValidation = [
  param('id')
    .isNumeric().withMessage('ID harus angka'),
];
