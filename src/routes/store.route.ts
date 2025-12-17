import { Router } from 'express';
import {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
  searchStores
} from '../controllers/store.controller';
import { validate } from '../utils/validate';
import {
  createStoreValidation,
  getStoreByIdValidation
} from '../middlewares/store.validation';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/stores', getAllStores, authenticate);
router.get('/stores/search', searchStores, authenticate); // Route search harus sebelum :id
router.get('/stores/:id', validate(getStoreByIdValidation), getStoreById, authenticate);
router.post('/stores', validate(createStoreValidation), createStore, authenticate);
router.put('/stores/:id', validate(createStoreValidation), updateStore, authenticate);
router.delete('/stores/:id', validate(getStoreByIdValidation), deleteStore, authenticate);

export default router;
