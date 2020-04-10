import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import getCategories from './category.ctrl/getCategories';
import createCategory from './category.ctrl/createCategory';
import modifyCategory from './category.ctrl/modifyCategory';
import deleteCategory from './category.ctrl/deleteCategory';
import getCategory from './category.ctrl/getCategory';

const router = Router();

router.get('/', getCategories);
router.get('/:idx', getCategory);
router.post('/', createCategory);
router.put('/:idx', modifyCategory);
router.delete('/:idx', deleteCategory);

export default router;