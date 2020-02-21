import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/auth';
import modifyProfile from './profile.ctrl/modifyProfile';

const router = Router();

router.put('/', authMiddleware.user, modifyProfile);

export default router;