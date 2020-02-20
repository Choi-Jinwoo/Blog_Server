import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
import { validateCreate } from '../../../../lib/validation/reply';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Comment from '../../../../entity/Comment';
import Reply from '../../../../entity/Reply';
import Post from '../../../../entity/Post';

export default async (req: AuthRequest, res: Response) => {
  if (!validateCreate(req, res)) return;

  const user: User = req.user;
  type RequestBody = {
    content: string;
    comment_idx: number;
  }

  const data: RequestBody = req.body;

  try {
    const commentRepo = getRepository(Comment);
    const comment: Comment = await commentRepo.findOne({
      where: {
        idx: data.comment_idx,
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

    if (post.is_deleted) {
      logger.yellow('글 없음.');
      res.status(404).json({
        message: '글 없음.',
      });
      return;
    }

    // 비공개 글
    if (post.is_private) {
      if (!user || !user.is_admin) {
        logger.yellow('권한 없음');
        res.status(403).json({
          message: '권한 없음.',
        });
      }
      return;
    }

    comment.has_replies = true;
    await commentRepo.save(comment);

    const replyRepo = getRepository(Reply);
    const reply = new Reply;
    reply.content = data.content;
    reply.user = user || null;
    reply.comment = comment;
    await replyRepo.save(reply);

    logger.green('답글 생성 성공.');
    res.status(200).json({
      message: '답글 생성 성공.',
    });
  } catch (err) {
    logger.red('답글 생성 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}