import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers
} from '../controllers/user.controller';
import { validate } from '../utils/validate';
import {
  createUserValidation,
  getUserByIdValidation
} from '../middlewares/user.validation';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/users', getAllUsers, authenticate);
router.get('/users/search', searchUsers, authenticate); 
router.get('/users/:id', validate(getUserByIdValidation), getUserById, authenticate);
router.post('/users', validate(createUserValidation), createUser, authenticate);
router.put('/users/:id', validate(createUserValidation), updateUser, authenticate);
router.delete('/users/:id', validate(getUserByIdValidation), deleteUser, authenticate);

export default router;
