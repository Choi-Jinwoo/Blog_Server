import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import modifyProfile from './profile.ctrl/modifyProfile';
import getProfile from './profile.ctrl/getProfile';

const router = Router();

router.get('/', authMiddleware.user, getProfile);
router.put('/', authMiddleware.user, modifyProfile);

export default router;