import { Response, NextFunction } from 'express';

const admin = (req, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: '인증 되지 않음.',
    });
  }

  if (!req.user.is_admin) {
    return res.status(403).json({
      messages: '권한 없음.',
    });
  }

  return next();
}

const user = (req, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: '인증 되지 않음.',
    });
  }

  return next();
}

const guest = (req, res: Response, next: NextFunction) => {
  return next();
}

export default {
  admin,
  user,
  guest,
};
