import { Request, Response } from 'express';
import logger from '../../../../lib/logger';
import generateURL from '../../../../lib/util/generateURL';
import AuthRequest from '../../../../type/AuthRequest';

export default async (req: AuthRequest, res: Response) => {
  const profileImage = generateURL(req, 'basic_profile.png');

  logger.green('기본 프로필 이미지 조회 성공.');
  res.status(200).json({
    message: '기본 프로필 이미지 조회 성공.',
    data: {
      profile_image: profileImage,
    },
  });
}