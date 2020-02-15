import { Request, Response, NextFunction } from 'express';
import logger from '../../../../lib/logger';
import passport from '../../../../lib/passport';
import { getRepository } from 'typeorm';
import User from '../../../../entity/User';

export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('google-register', (err, user, info) => {
    if (err) {
      if (err === 'CONFLICT') {
        logger.yellow('중복된 아이디');
        return res.status(401).json({
          mesage: '중복된 아이디',
        });
      }

      res.status(500).json({
        mesage: '서버 오류',
      });
    } else {
      logger.green('회원가입 성공.');
      res.status(200).json({
        mesage: '회원가입 성공.',
      });
    }
  })(req, res);
}
