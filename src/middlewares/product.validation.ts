import { body, param, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';

// Helper function untuk menjalankan validasi
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const errorList = errors.array().map((err: any) => ({
      field: err.path || err.param || 'unknown',
      message: err.msg
    }));

    return errorResponse(res, 'Validasi gagal', 400, errorList);
  };
};

export const createProductValidation = [
  body('nama')
    .trim()
    .notEmpty().withMessage('Nama produk wajib diisi')
    .isLength({ min: 3 }).withMessage('Nama produk minimal 3 karakter'),
  
  body('deskripsi')
    .trim()
    .notEmpty().withMessage('Deskripsi wajib diisi'),
  
  body('harga')
    .isNumeric().withMessage('Harga harus angka')
    .custom(value => value > 0).withMessage('Harga harus lebih dari 0'),
  
  // ===== TAMBAHAN VALIDASI STOK =====
  body('stok')
    .isNumeric().withMessage('Stok harus angka')
    .custom(value => value >= 0).withMessage('Stok tidak boleh negatif')
    .notEmpty().withMessage('Stok wajib diisi')
];

export const getProductByIdValidation = [
  param('id')
    .isNumeric().withMessage('ID harus angka')
];

// ===== TAMBAHAN: Validasi untuk update (opsional field) =====
export const updateProductValidation = [
  param('id')
    .isNumeric().withMessage('ID harus angka'),
  
  body('nama')
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage('Nama produk minimal 3 karakter'),
  
  body('deskripsi')
    .optional()
    .trim(),
  
  body('harga')
    .optional()
    .isNumeric().withMessage('Harga harus angka')
    .custom(value => value > 0).withMessage('Harga harus lebih dari 0'),
  
  body('stok')
    .optional()
    .isNumeric().withMessage('Stok harus angka')
    .custom(value => value >= 0).withMessage('Stok tidak boleh negatif')
];