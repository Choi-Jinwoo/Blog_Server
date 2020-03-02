import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import generateURL from '../../../../lib/util/generateURL';
import { getRepository } from 'typeorm';

export default async (req: AuthRequest, res: Response) => {
  let user: User = req.user;
  if (req.query.user) {
    const findUserId: string = req.query.user;
    const userRepo = getRepository(User);
    user = await userRepo.findOne({
      where: {
        id: findUserId,
      },
    });
    if (!user) {
      res.status(404).json({
        message: '회원 없음.',
      });
      return;
    }
  }

  delete user.pw;

  user.profile_image = generateURL(req, user.profile_image || 'basic_profile.png');
  logger.green('프로필 조회 성공');
  res.status(200).json({
    message: '프로필 조회 성공.',
    data: {
      user,
    },
  });
}