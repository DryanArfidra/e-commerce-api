import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} from '../controllers/product.controller';
import { 
  validate, 
  createProductValidation, 
  getProductByIdValidation,
  updateProductValidation 
} from '../middlewares/product.validation';

const router = Router();

router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/:id', validate(getProductByIdValidation), getProductById);
router.post('/', validate(createProductValidation), createProduct);
router.put('/:id', validate(updateProductValidation), updateProduct); 
router.delete('/:id', validate(getProductByIdValidation), deleteProduct);

export default router;