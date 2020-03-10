import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
import { validateCreate } from '../../../../lib/validation/notice';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Notice from '../../../../entity/Notice';
import { sendNotice } from '../../../../lib/util/email';

export default async (req: AuthRequest, res: Response) => {
  if (!validateCreate(req, res)) return;

  const user: User = req.user;
  type RequestBody = {
    title: string;
    content: string;
  }
  const { title, content }: RequestBody = req.body;

  try {
    const noticeRepo = getRepository(Notice);
    const notice = new Notice();
    notice.title = title;
    notice.content = content;
    notice.user = user;
    await noticeRepo.save(notice);
    logger.green('공지 생성 성공.');
    res.status(200).json({
      message: '공지 생성 성공.',
    });

    try {
      await sendNotice(title, content);
    } catch (err) {
      logger.red('이메일 서버 오류.', err.message);
    }
  } catch (err) {
    logger.red('공지 생성 서버 오류.', err.message);
    return res.status(500).json({
      message: '서버 오류.',
    });
  }
}