import { Request, Response, NextFunction } from 'express';
import logger from '../../../../lib/logger';
import passport from '../../../../lib/passport';
import { getRepository } from 'typeorm';
import User from '../../../../entity/User';

export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('google', async (err, user, info) => {
    if (err) {
      if (err.message === 'UNAUTHORIZED') {
        const registUser = new User;
        registUser.id = user.id;
        registUser.name = user.displayName;
        registUser.email = user.emails[0].value;
        const userRepo = getRepository(User);
        await userRepo.save(registUser);

        logger.green('회원가입 성공.');
        res.status(200).json({
          mesage: '회원가입 성공.',
        });
      }

      logger.red('서버 오류.', err.message);
      res.status(500).json({
        mesage: '서버 오류',
      });
    } else {
      logger.yellow('중복된 아이디');
      res.status(409).json({
        mesage: '중복된 아이디.',
      });
    }
  })(req, res);
}
