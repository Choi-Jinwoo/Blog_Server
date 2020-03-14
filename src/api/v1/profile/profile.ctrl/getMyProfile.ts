import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import generateURL from '../../../../lib/util/generateURL';

export default async (req: AuthRequest, res: Response) => {
  let user: User = req.user;

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