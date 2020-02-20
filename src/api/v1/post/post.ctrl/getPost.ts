import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Post from '../../../../entity/Post';

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow('검증 오류.', 'idx is NaN');
    res.status(400).json({
      message: '검증 오류.',
    });
    return;
  }

  try {
    const postRepo = getRepository(Post);
    const post: Post = await postRepo.findOne({
      where: {
        idx,
        is_deleted: false,
      }
    });

    if (!post) {
      logger.yellow('글 없음');
      res.status(404).json({
        message: '글 없음.',
      });
      return;
    }

    if (post.is_private) {
      if (!user || post.fk_user_id !== user.id) {
        logger.yellow('권한 없음.');
        res.status(403).json({
          message: '권한 없음.',
        });
        return;
      }
    }

    logger.green('글 조회 성공.');
    res.status(200).json({
      message: '글 조회 성공.',
      data: {
        post,
      }
    });
    return;
  } catch (err) {
    logger.red('서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}