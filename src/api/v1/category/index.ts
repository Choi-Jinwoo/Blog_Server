import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import getCategories from './category.ctrl/getCategories';
import createCategory from './category.ctrl/createCategory';
import modifyCategory from './category.ctrl/modifyCategory';
import deleteCategory from './category.ctrl/deleteCategory';

const router = Router();

router.get('/', getCategories);
router.post('/', authMiddleware.admin, createCategory);
router.put('/:idx', authMiddleware.admin, modifyCategory);
router.delete('/:idx', authMiddleware.admin, deleteCategory);

export default router;