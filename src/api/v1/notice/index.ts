import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import createNotice from './notice.ctrl/createNotice';
import modifyNotice from './notice.ctrl/modifyNotice';

const router = Router();

router.post('/', authMiddleware.admin, createNotice);
router.put('/:idx', authMiddleware.admin, modifyNotice);

export default router;
