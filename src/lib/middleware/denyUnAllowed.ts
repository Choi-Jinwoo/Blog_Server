import { Request, Response, NextFunction } from 'express'
import { ip } from '../../../config/web.json';

export default (req: Request, res: Response, next: NextFunction) => {
  const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log(addr)

  if (addr !== ip) {
    res.status(403).send('Forbidden');
    return;
  }

  next();
}