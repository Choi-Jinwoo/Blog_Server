import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import createPost from './post.ctrl/createPost';
import modifyPost from './post.ctrl/modifyPost';
import deletePost from './post.ctrl/deletePost';

const router = Router();

router.post('/', authMiddleware.admin, createPost);
router.put('/:idx', authMiddleware.admin, modifyPost);
router.delete('/:idx', authMiddleware.admin, deletePost);

export default router;