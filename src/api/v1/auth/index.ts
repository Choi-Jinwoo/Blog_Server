import { Router } from 'express';
import passport from '../../../lib/passport';

const router = Router();

router.get('/login', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login'
}),
  (req, res) => {
    console.log('success');
    res.redirect('/');
  });

import mid from '../../../lib/middleware/auth';

router.get('/account', mid, (req: any, res) => {
  console.log(req.user);
});
export default router;