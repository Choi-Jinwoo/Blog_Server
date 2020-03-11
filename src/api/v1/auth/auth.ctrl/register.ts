/**
 * 409 - 중복된디아이디
 */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validateRegister } from '../../../../lib/validation/auth';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';

export default async (req: Request, res: Response) => {
  if (!validateRegister(req, res)) return;

  type RequestBody = {
    id: string;
    pw: string;
    name: string;
  }
  const data: RequestBody = req.body;

  try {
    const userRepo = getRepository(User);
    const isExist: User = await userRepo.findOne({
      where: {
        id: data.id,
      },
    });

    if (isExist) {
      logger.yellow('중복된 아이디.');
      res.status(409).json({
        message: '중복된 아이디',
      });
      return;
    }

    await userRepo.save(data);
    logger.green('회원가입 성공.');
    return res.status(200).json({
      message: '회원가입 성공.',
    });
  } catch (err) {
    logger.red('회원가입 서버 오류.', err.message);
    return res.status(500).json({
      message: '서버 오류.',
    });
  }
}
