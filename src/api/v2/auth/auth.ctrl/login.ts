/**
 * 401 - 인증 실패
 */
import { Request, Response } from 'express';
import { validateLogin } from '../../../../lib/validation/auth';
import logger from '../../../../lib/logger';
import { createToken } from '../../../../lib/token';
import { access_code } from '../../../../../config/admin.json';

export default async (req: Request, res: Response) => {
  if (!validateLogin(req, res)) return;

  type RequestBody = {
    code: string;
  };
  const { code }: RequestBody = req.body;

  try {
    if (access_code !== code) {
      logger.yellow('인증 실패.');
      res.status(401).json({
        message: '인증 실패.',
      });
      return;
    }

    const token = await createToken();
    logger.green('로그인 성공.');
    res.status(200).json({
      message: '로그인 성공.',
      data: {
        'x-access-token': token,
      },
    });
  } catch (err) {
    logger.red('로그인 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}