import { body, param } from 'express-validator';

/**
 * Validasi checkout transaction
 */
export const checkoutTransactionValidation = [
  body('userId')
    .notEmpty().withMessage('User ID wajib diisi')
    .isUUID().withMessage('User ID harus UUID'),

  body('items')
    .isArray({ min: 1 }).withMessage('Items harus berupa array dan tidak boleh kosong'),

  body('items.*.productId')
    .notEmpty().withMessage('Product ID wajib diisi')
    .isUUID().withMessage('Product ID harus UUID'),

  body('items.*.quantity')
    .notEmpty().withMessage('Quantity wajib diisi')
    .isInt({ min: 1 }).withMessage('Quantity minimal 1'),
];

/**
 * Validasi param transaction ID
 */
export const getTransactionByIdValidation = [
  param('id')
    .notEmpty().withMessage('Transaction ID wajib diisi')
    .isUUID().withMessage('Transaction ID harus UUID'),
];
