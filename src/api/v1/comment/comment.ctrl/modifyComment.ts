/**
 * 400 - 검증 오류
 * 403 - 권한 없음 / 비공개 글
 * 404 - 댓글 없음
 */
import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
import { validateModify } from '../../../../lib/validation/comment';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Comment from '../../../../entity/Comment';
import Post from '../../../../entity/Post';

export default async (req: AuthRequest, res: Response) => {
  if (!validateModify(req, res)) return;

  const user: User = req.user;
  const idx: number = Number(req.params.idx);
  if (isNaN(idx)) {
    logger.yellow('검증 오류.', 'idx is NaN');
    res.status(400).json({
      message: '검증 오류.',
    });
    return;
  }

  type RequestBody = {
    content: string;
  };

  const { content }: RequestBody = req.body;

  try {
    const commentReo = getRepository(Comment);
    const comment: Comment = await commentReo.findOne({
      where: {
        idx,
      },
    });

    if (!comment) {
      logger.yellow('댓글 없음.');
      res.status(404).json({
        message: '댓글 없음.',
      });
      return;
    }


    if (comment.fk_user_id !== user.id) {
      logger.yellow('권한 없음.');
      res.status(403).json({
        message: '권한 없음.',
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
      if (!user.is_admin) {
        logger.yellow('권한 없음(비공개 글)');
        res.status(403).json({
          message: '비공개 글.',
        });
        return;
      }
    }

    comment.content = content;
    await commentReo.save(comment);

    logger.green('댓글 수정 성공.');
    res.status(200).json({
      message: '댓글 수정 성공.',
    });
    return;
  } catch (err) {
    logger.red('댓글 수정 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}