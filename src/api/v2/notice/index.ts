import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import getNotices from './notice.ctrl/getNotices';
import createNotice from './notice.ctrl/createNotice';
import getRecentNotice from './notice.ctrl/getRecentNotice';

const router = Router();

router.get('/recent', getRecentNotice);

router.get('/', getNotices);
router.post('/', authMiddleware, createNotice);

export default router;
