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

const router = Router();

router.get('/stores', getAllStores);
router.get('/stores/search', searchStores); // Route search harus sebelum :id
router.get('/stores/:id', validate(getStoreByIdValidation), getStoreById);
router.post('/stores', validate(createStoreValidation), createStore);
router.put('/stores/:id', validate(createStoreValidation), updateStore);
router.delete('/stores/:id', validate(getStoreByIdValidation), deleteStore);

export default router;
