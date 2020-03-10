import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
import { validateCreate } from '../../../../lib/validation/notice';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Notice from '../../../../entity/Notice';

export default async (req: AuthRequest, res: Response) => {
  if (!validateCreate(req, res)) return;

  const user: User = req.user;
  type RequestBody = {
    content: string;
  }
  const { content }: RequestBody = req.body;

  try {
    const noticeRepo = getRepository(Notice);
    const notice = new Notice();
    notice.content = content;
    notice.user = user;
    await noticeRepo.save(notice);
    logger.green('공지 생성 성공.');
    return res.status(200).json({
      message: '공지 생성 성공.',
    });
  } catch (err) {
    logger.red('공지 생성 서버 오류.', err.message);
    return res.status(500).json({
      message: '서버 오류.',
    });
  }
}