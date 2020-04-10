import { Router } from 'express';
import login from './auth.ctrl/login'
import sendAuthCode from './auth.ctrl/sendAuthCode';
import checkAuthCode from './auth.ctrl/checkAuthCode';

const router = Router();

router.post('/login', login);
router.post('/email/send', sendAuthCode);
router.post('/email/check', checkAuthCode);

export default router;
