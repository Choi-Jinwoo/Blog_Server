import { Router, NextFunction } from 'express';
import passport from '../../../lib/passport';
import loginCallback from './auth.ctrl/loginCallback';
import registerCallback from './auth.ctrl/registerCallback';
import logout from './auth.ctrl/logout';

const router = Router();

const scope = [
  'profile',
  'email',
];

router.get('/login', passport.authenticate('google-login', {
  scope,
}));
router.get('/register', passport.authenticate('google-register', {
  scope,
}));
router.use('/google-login/callback', loginCallback);
router.use('/google-register/callback', registerCallback);
router.use('/logout', logout);

export default router;