import { Router } from 'express';

import auth from './auth';
import category from './category';
// import upload from './upload';
// import post from './post'
// import file from './file';
// import subscription from './subscription';
// import notice from './notice';

const router = Router();

router.use('/auth', auth);
router.use('/category', category);
// router.use('/upload', upload);
// router.use('/post', post);
// router.use('/file', file);
// router.use('/subscription', subscription);
// router.use('/notice', notice);

export default router;