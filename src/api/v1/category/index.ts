import { Router } from 'express';
import getCategories from './category.ctrl/getCategories';
import authMiddleware from '../../../lib/middleware/auth';

const router = Router();

router.get('/', authMiddleware, getCategories);

export default router;