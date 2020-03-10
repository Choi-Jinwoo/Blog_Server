import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import createNotice from './notice.ctrl/createNotice';

const router = Router();

router.post('/', authMiddleware.admin, createNotice);

export default router;
