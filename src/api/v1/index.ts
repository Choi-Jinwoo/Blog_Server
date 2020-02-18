import { Router } from 'express';
import auth from './auth';
import category from './category';
import upload from './upload';
import post from './post'

const router = Router();

router.use('/auth', auth);
router.use('/category', category);
router.use('/upload', upload);
router.use('/post', post);

export default router;