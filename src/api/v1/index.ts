import { Router } from 'express';
import auth from './auth';
import category from './category';
import upload from './upload';
import post from './post'
import comment from './comment';
import reply from './reply';

const router = Router();

router.use('/auth', auth);
router.use('/category', category);
router.use('/upload', upload);
router.use('/post', post);
router.use('/comment', comment);
router.use('/reply', reply);

export default router;