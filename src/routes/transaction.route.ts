import { Router } from 'express';
import { checkout, getDetail } from '../controllers/transaction.controller';
import { validate } from '../utils/validate';
import {
  checkoutTransactionValidation,
  getTransactionByIdValidation
} from '../middlewares/transaction.validation';


const router = Router();


router.post(
  '/transactions/checkout',
  validate(checkoutTransactionValidation),
  checkout
);


router.get(
  '/transactions/:id',
  validate(getTransactionByIdValidation),
  getDetail
);

export default router;
