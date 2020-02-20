import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import createComment from './comment.ctrl/createComment';
import modifyComment from './comment.ctrl/modifyComment';
import deleteComment from './comment.ctrl/deleteComment';

const router = Router();

router.post('/', authMiddleware.guest, createComment);
router.put('/:idx', authMiddleware.user, modifyComment);
router.delete('/:idx', authMiddleware.user, deleteComment);

export default router;