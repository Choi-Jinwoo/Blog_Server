import { Request, Response, NextFunction } from 'express';
import logger from '../../../../lib/logger';
import passport from '../../../../lib/passport';
import { getRepository } from 'typeorm';
import User from '../../../../entity/User';

export default (req, res: Response, next: NextFunction) => {
  passport.authenticate('google-login', (err, user, info) => {
    if (err) {
      if (err === 'UNAUTHORIZED') {
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
      req.login(user, (err) => {
        if (err) {
          logger.red(err);
          return res.status(500).json({
            mesage: '서버 오류.',
          });
        }
        logger.green('인증 성공.');
        res.status(200).json({
          mesage: '인증 성공.',
        });
      });
    }
  })(req, res);

}
