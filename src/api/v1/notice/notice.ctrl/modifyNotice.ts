import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
import { validateModify } from '../../../../lib/validation/notice';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Notice from '../../../../entity/Notice';

export default async (req: AuthRequest, res: Response) => {
  if (!validateModify(req, res)) return;
  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow('검증 오류.', 'idx is NaN');
    res.status(400).json({
      message: '검증 오류.',
    });
    return;
  }

  const user: User = req.user;
  type RequestBody = {
    title: string;
    content: string;
  }
  const { title, content }: RequestBody = req.body;

  try {
    const noticeRepo = getRepository(Notice);
    const notice: Notice = await noticeRepo.findOne({
      where: {
        idx,
      },
    });

    if (!notice) {
      res.status(404).json({
        message: '공지 없음.',
      });
      return;
    }

    if (notice.fk_user_id !== user.id) {
      res.status(403).json({
        message: '권한 없음.',
      });
      return;
    }

    notice.title = title || notice.title;
    notice.content = content || notice.content;
    noticeRepo.save(notice);

    logger.green('공지 변경 성공.');
    res.status(200).json({
      message: '공지 변경 성공.',
    });
  } catch (err) {
    logger.red('공지 변경 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}