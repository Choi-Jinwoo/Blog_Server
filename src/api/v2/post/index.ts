import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import createPost from './post.ctrl/createPost';
import modifyPost from './post.ctrl/modifyPost';
import deletePost from './post.ctrl/deletePost';
import getPosts from './post.ctrl/getPosts';
import getPost from './post.ctrl/getPost';
import findPosts from './post.ctrl/findPosts';
import getTempPosts from './post.ctrl/getTempPosts';

const router = Router();

router.get('/find', findPosts);
router.get('/temp', authMiddleware, getTempPosts);

router.get('/', getPosts);
router.get('/:idx', getPost);
router.post('/', authMiddleware, createPost);
router.put('/:idx', authMiddleware, modifyPost);
router.delete('/:idx', authMiddleware, deletePost);

export default router;