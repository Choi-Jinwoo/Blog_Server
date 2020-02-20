import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import createReply from './reply.ctrl/createReply';
import modifyReply from './reply.ctrl/modifyReply';

const router = Router();

router.post('/', authMiddleware.guest, createReply);
router.put('/:idx', authMiddleware.user, modifyReply);

export default router;