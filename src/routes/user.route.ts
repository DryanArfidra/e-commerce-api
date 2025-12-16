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

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/search', searchUsers); 
router.get('/users/:id', validate(getUserByIdValidation), getUserById);
router.post('/users', validate(createUserValidation), createUser);
router.put('/users/:id', validate(createUserValidation), updateUser);
router.delete('/users/:id', validate(getUserByIdValidation), deleteUser);

export default router;
