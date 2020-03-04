import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validateLogin } from '../../../../lib/validation/auth';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import { createToken } from '../../../../lib/token';

export default async (req: Request, res: Response) => {
  if (!validateLogin(req, res)) return;

  type RequestBody = {
    id: string;
    pw: string;
  };
  const { id, pw }: RequestBody = req.body;

  try {
    const userRepo = getRepository(User);
    const isExist: User = await userRepo.findOne({
      where: {
        id,
        pw,
      },
    });

    if (!isExist) {
      logger.yellow('인증 실패.');
      res.status(401).json({
        message: '인증 실패.',
      });
      return;
    }

    const token = await createToken(isExist.id);
    logger.green('로그인 성공.');
    res.status(200).json({
      message: '로그인 성공.',
      data: {
        'x-access-token': token,
        is_admin: isExist.is_admin,
        name: isExist.name,
      },
    });
  } catch (err) {
    logger.red('로그인 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}