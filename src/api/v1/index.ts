import { Router } from 'express';
import auth from './auth';
import category from './category';
import upload from './upload';
import post from './post'
import comment from './comment';
import reply from './reply';
import file from './file';
import subscription from './subscription';
import profile from './profile';
import notice from './notice';

const router = Router();

router.use('/auth', auth);
router.use('/category', category);
router.use('/upload', upload);
router.use('/post', post);
router.use('/comment', comment);
router.use('/reply', reply);
router.use('/file', file);
router.use('/subscription', subscription);
router.use('/profile', profile);
router.use('/notice', notice);

export default router;