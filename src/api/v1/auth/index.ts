import { Router, NextFunction } from 'express';
import login from './auth.ctrl/login';
import register from './auth.ctrl/register';

const router = Router();

router.post('/login', login);
router.post('/register', register);

export default router;
