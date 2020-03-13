import { Router, NextFunction } from 'express';
import login from './auth.ctrl/login';
import register from './auth.ctrl/register';
import sendAuthCode from './auth.ctrl/sendAuthCode';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/email/send', sendAuthCode);

export default router;
