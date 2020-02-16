import { Response, NextFunction } from 'express';
import logger from '../../../../lib/logger';
import passport from '../../../../lib/passport';

export default (req, res: Response, next: NextFunction) => {
  passport.authenticate('google-login', (err, user, info) => {
    if (err) {
      if (err === 'UNAUTHORIZED') {
        logger.yellow('인증 실패');
        return res.status(401).json({
          mesage: '인증 실패',
        });
      }

      if (err.message === 'Bad Request') {
        logger.yellow('[GOOGLE] BAD REQUEST');
        return res.status(400).json({
          message: 'OAUTH 검증 오류.',
        });
      }

      logger.red('서버 오류.', err.message);
      res.status(500).json({
        mesage: '서버 오류',
      });
    } else {
      req.login(user, (err) => {
        if (err) {
          logger.red(err.message);
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
