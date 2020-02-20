import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Post from '../../../../entity/Post';
import Comment from '../../../../entity/Comment';

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const postIdx: number = req.query.post;

  try {
    const postRepo = getRepository(Post);
    const post: Post = await postRepo.findOne({
      where: {
        idx: postIdx,
        is_deleted: false,
      },
    });

    if (!post) {
      logger.yellow('글 없음');
      res.status(404).json({
        message: '글 없음.',
      });
      return;
    }

    if (post.is_private) {
      if (!user || !user.is_admin) {
        logger.yellow('권한 업음.');
        res.status(403).json({
          message: '권한 없음.',
        });
        return;
      }
    }

    const commentRepo = getRepository(Comment);
    const comments: Comment[] = await commentRepo.find({
      where: {
        post,
      },
    });

    logger.green('댓글 목록 조회 성공.');
    res.status(200).json({
      message: '댓글 목록 조회 성공.',
      data: {
        comments,
      },
    });
  } catch (err) {
    logger.red('댓글 목록 조회 서버 오류', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}