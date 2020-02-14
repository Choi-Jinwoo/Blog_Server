import { Router, NextFunction } from 'express';
import passport from '../../../lib/passport';

const router = Router();

router.get('/login', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/google/callback', passport.authenticate('google', {
  //TODO 실패시 확인
  failureRedirect: '/',
}), (req, res) => {
  return res.status(200).json({
    message: '로그인 성공.',
  });
});

export default router;