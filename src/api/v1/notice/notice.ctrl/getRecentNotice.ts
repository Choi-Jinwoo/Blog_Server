import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import logger from '../../../../lib/logger';
import Notice from '../../../../entity/Notice';

export default async (req: Request, res: Response) => {
  try {
    const noticeRepo = getRepository(Notice);
    const notice: Notice = await noticeRepo.findOne({
      order: {
        created_at: 'DESC',
      },
    });

    logger.green('최근 공지 조회 성공.');
    res.status(200).json({
      message: '최근 공지 조회 성공.',
      data: {
        notice,
      },
    });
  } catch (err) {
    logger.red('최근 공지 조회 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}