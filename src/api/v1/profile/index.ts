import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import modifyProfile from './profile.ctrl/modifyProfile';
import getMyProfile from './profile.ctrl/getMyProfile';
import getProfie from './profile.ctrl/getProfie';

const router = Router();

router.get('/', getProfie);
router.get('/my', authMiddleware.user, getMyProfile);
router.put('/', authMiddleware.user, modifyProfile);

export default router;