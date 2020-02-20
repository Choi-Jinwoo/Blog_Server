import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import createReply from './reply.ctrl/createReply';

const router = Router();

router.post('/', authMiddleware.guest, createReply);

export default router;