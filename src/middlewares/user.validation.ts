import { body, param, query } from 'express-validator';

export const createUserValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Nama wajib diisi')
    .isLength({ min: 2 }).withMessage('Nama minimal 2 karakter'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email wajib diisi')
    .isEmail().withMessage('Format email tidak valid'),
];

export const getUserByIdValidation = [
  param('id')
    .isUUID().withMessage('ID user harus UUID'),
];

export const searchUserValidation = [
  query('name')
    .optional()
    .isString().withMessage('Nama harus berupa string'),

  query('email')
    .optional()
    .isEmail().withMessage('Format email tidak valid'),
];
