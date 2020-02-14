import { Response, NextFunction } from 'express';

export default (req, res: Response, next: NextFunction) => {
  if (req.isAuthenticated())
    return next();

  if (next) {
    return next();
  }

  return res.status(401).json({
    message: '인증 되지 않음.',
  });
};
