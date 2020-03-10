import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import getNotices from './notice.ctrl/getNotices';
import createNotice from './notice.ctrl/createNotice';
import modifyNotice from './notice.ctrl/modifyNotice';
import deleteNotice from './notice.ctrl/deleteNotice';

const router = Router();

router.get('/', getNotices);
router.post('/', authMiddleware.admin, createNotice);
router.put('/:idx', authMiddleware.admin, modifyNotice);
router.delete('/:idx', authMiddleware.admin, deleteNotice);

export default router;
