import { Router, NextFunction } from 'express';
import passport from '../../../lib/passport';
import login from './auth.ctrl/login';
import logout from './auth.ctrl/logout';
import auth from '../../../lib/middleware/auth';
import register from './auth.ctrl/register';

const router = Router();

router.get('/login', passport.authenticate('google', {
  scope: [
    'profile',
    'email',
  ],
}));
router.use('/google/callback', login);
router.use('/logout', logout);
// TODO Register Refactoring

export default router;