import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import createComment from './comment.ctrl/createComment';

const router = Router();

router.post('/', authMiddleware.guest, createComment);

export default router;