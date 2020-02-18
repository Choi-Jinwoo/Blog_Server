import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import createPost from './post.ctrl/createPost';

const router = Router();

router.post('/', authMiddleware.admin, createPost);

export default router;