import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import getCategories from './category.ctrl/getCategories';
import createCategory from './category.ctrl/createCategory';
import modifyCategory from './category.ctrl/modifyCategory';
import deleteCategory from './category.ctrl/deleteCategory';
import getCategory from './category.ctrl/getCategory';
import modifyOrderNumber from './category.ctrl/modifyOrderNumber';

const router = Router();

router.put('/order', authMiddleware.admin, modifyOrderNumber);

router.get('/', getCategories);
router.get('/:idx', getCategory);
router.post('/', authMiddleware.admin, createCategory);
router.put('/:idx', authMiddleware.admin, modifyCategory);
router.delete('/:idx', authMiddleware.admin, deleteCategory);

export default router;
