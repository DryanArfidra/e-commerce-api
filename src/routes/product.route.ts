import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} from '../controllers/product.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../utils/validate';
import {  
  createProductValidation, 
  getProductByIdValidation 
} from '../middlewares/product.validation';

const router = Router();

router.get('/products', getAllProducts, authenticate);
router.get('/products/search', searchProducts, authenticate); // Route search harus sebelum :id
router.get('/products/:id', validate(getProductByIdValidation), getProductById, authenticate);
router.post('/products', validate(createProductValidation), createProduct, authenticate);
router.put('/products/:id', validate(createProductValidation), updateProduct, authenticate);
router.delete('/products/:id', validate(getProductByIdValidation), deleteProduct, authenticate);
export default router;