import { Response, NextFunction } from 'express';
import logger from '../../../../lib/logger';

export default (req, res: Response) => {
  req.logout();
  logger.green('로그아웃 성공.');
  res.status(200).json({
    message: '로그아웃 성공.',
  });
}
