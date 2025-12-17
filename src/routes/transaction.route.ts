import { Router } from 'express';
import { checkout, getDetail } from '../controllers/transaction.controller';
import { validate } from '../utils/validate';
import { checkoutTransactionValidation, getTransactionByIdValidation } from '../middlewares/transaction.validation';
import { authenticate } from '../middlewares/auth.middleware';


const router = Router();

router.post('/transactions',validate(checkoutTransactionValidation),checkout, authenticate);
router.get('/transactions/:id',validate(getTransactionByIdValidation),getDetail, authenticate);

export default router;
