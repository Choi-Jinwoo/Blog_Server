/**
 * 403 - 비공개 글
 * 404 - 글 없음 / 댓글 없음
 */
import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Comment from '../../../../entity/Comment';
import Post from '../../../../entity/Post';
import Reply from '../../../../entity/Reply';

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const commentIdx: number = req.query.comment;

  try {
    const commentRepo = getRepository(Comment);
    const comment: Comment = await commentRepo.findOne({
      where: {
        idx: commentIdx,
      },
    });

    if (!comment) {
      logger.yellow('댓글 없음.');
      res.status(404).json({
        message: '댓글 없음.',
      });
      return;
    }

    const postRepo = getRepository(Post);
    const post: Post = await postRepo.findOne({
      where: {
        idx: comment.fk_post_idx,
        is_deleted: false,
      },
    });

    if (!post) {
      logger.yellow('글 없음.');
      res.status(404).json({
        message: '글 없음.',
      });
      return;
    }

    if (post.is_private) {
      if (!user || !user.is_admin) {
        logger.yellow('권한 없음.');
        res.status(403).json({
          message: '권한 없음.',
        });
        return;
      }
    }

    const replyRepo = getRepository(Reply);
    const replies: Reply[] = await replyRepo.find({
      where: {
        comment,
      },
    });

    logger.yellow('답글 목록 조회 성공.');
    res.status(200).json({
      message: '답글 목록 조회 성공.',
      data: {
        replies,
      },
    });
  } catch (err) {
    logger.red('답글 목록 조회 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}