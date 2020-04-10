/**
 *  401 인증 안됨
 *  410 토큰 만료
 * ]
 */
import { Response, Request, NextFunction } from 'express';
import { verifyToken } from '../token';
import logger from '../logger';

export default async (req: Request, res: Response, next: NextFunction) => {
  const reqToken: string | string[] = req.headers['x-access-token'];
  if (Array.isArray(reqToken)) {
    res.status(400).json({
      message: '검증 오류.',
    });
    return;
  }

  const token = reqToken;
  try {
    const decoded = await verifyToken(token);

    if (decoded.permission !== 'admin') {
      res.status(401).json({
        message: '토큰 인증 실패',
      });
      return;
    }

    next();
  } catch (err) {
    switch (err.message) {
      case 'jwt must be provided':
      case 'jwt malformed':
      case 'invalid token':
      case 'invalid signature':
        res.status(401).json({
          message: '토큰 인증 실패',
        });
        return;
      case 'jwt expired':
        res.status(410).json({
          message: '토큰 만료',
        });
        return;
      default:
        logger.red('토큰 확인 서버 오류.', err.message);
        res.status(500).json({
          message: '서버 오류.'
        });
    }
  }
}
