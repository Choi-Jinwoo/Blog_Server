/**
 * 400 - 검증 오류
 */
import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
import { validateModify } from '../../../../lib/validation/profile';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';

export default async (req: AuthRequest, res: Response) => {
  if (!validateModify(req, res)) return;
  const user: User = req.user;

  type RequestBody = {
    pw: string;
    name: string;
    profile_image;
  };
  const { pw, name, profile_image }: RequestBody = req.body;

  try {
    user.pw = pw || user.pw;
    user.name = name || user.name;
    user.profile_image = profile_image || user.profile_image;

    const userRepo = getRepository(User);
    await userRepo.save(user);

    logger.green('프로필 수정 성공.');
    res.status(200).json({
      message: '프로필 수정 성공.',
    });
  } catch (err) {
    logger.red('프로필 수정 서버 오류.', err.message);
    res.status(500).json({
      messages: '서버 오류.',
    });
  }
}