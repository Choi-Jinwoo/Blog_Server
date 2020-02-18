import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import createPost from './post.ctrl/createPost';
import modifyPost from './post.ctrl/modifyPost';

const router = Router();

router.post('/', authMiddleware.admin, createPost);
router.put('/:idx', authMiddleware.admin, modifyPost);

export default router;