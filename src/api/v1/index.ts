import { Router } from 'express';
import auth from './auth';
import category from './category';

const router = Router();

router.use('/auth', auth);
router.use('/category', category);

export default router;