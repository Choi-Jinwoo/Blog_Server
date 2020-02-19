import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import createComment from './comment.ctrl/createComment';
import modifyComment from './comment.ctrl/modifyComment';

const router = Router();

router.post('/', authMiddleware.guest, createComment);
router.put('/:idx', authMiddleware.user, modifyComment);

export default router;