import { Router } from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  searchCategories
} from '../controllers/category.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../utils/validate';
import {  
  createCategoryValidation, 
  getCategoryByIdValidation 
} from '../middlewares/category.validation';

const router = Router();

router.get('/categories', getAllCategories, authenticate);
router.get('/categories/search', searchCategories, authenticate); // Route search harus sebelum :id
router.get('/categories/:id', validate(getCategoryByIdValidation), getCategoryById, authenticate);
router.post('/categories', validate(createCategoryValidation), createCategory, authenticate);
router.put('/categories/:id', validate(createCategoryValidation), updateCategory, authenticate);
router.delete('/categories/:id', validate(getCategoryByIdValidation), deleteCategory, authenticate);

export default router;