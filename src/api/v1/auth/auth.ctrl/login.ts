import { Request, Response, NextFunction } from 'express';
import logger from '../../../../lib/logger';
import passport from '../../../../lib/passport';

export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) {
      if (err.message === 'UNAUTHORIZED') {
        logger.yellow('인증 실패');
        return res.status(401).json({
          mesage: '인증 실패',
        });
      }

      logger.red('서버 오류.', err.message);
      res.status(500).json({
        mesage: '서버 오류',
      });
    } else {
      logger.green('로그인 성공.');
      res.status(200).json({
        mesage: '로그인 성공.',
      });
    }
  })(req, res);
}