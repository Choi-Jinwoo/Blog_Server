import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import createReply from './reply.ctrl/createReply';
import modifyReply from './reply.ctrl/modifyReply';
import deleteReply from './reply.ctrl/deleteReply';
import getReplies from './reply.ctrl/getReplies';

const router = Router();

router.post('/', authMiddleware.guest, createReply);
router.put('/:idx', authMiddleware.user, modifyReply);
router.delete('/:idx', authMiddleware.user, deleteReply);
router.get('/', authMiddleware.guest, getReplies);

export default router;