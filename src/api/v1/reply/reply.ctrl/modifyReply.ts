import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
import { validateModify } from '../../../../lib/validation/reply';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Reply from '../../../../entity/Reply';
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
    const replyRepo = getRepository(Reply);
    const reply: Reply = await replyRepo.findOne({
      where: {
        idx,
      },
    });

    if (!reply) {
      logger.yellow('답글 없음.');
      res.status(404).json({
        message: '답글 없음.',
      });
      return;
    }


    if (reply.fk_user_id !== user.id) {
      logger.yellow('권한 없음.');
      res.status(403).json({
        message: '권한 없음.',
      });
      return;
    }

    const commentRepo = getRepository(Comment);
    const comment: Comment = await commentRepo.findOne({
      where: {
        idx: reply.fk_comment_idx,
      },
    });

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
        messages: '글 없음.',
      });
      return;
    }

    if (post.is_private) {
      if (!user.is_admin) {
        logger.yellow('권한 없음(비공개 글)');
        res.status(403).json({
          message: '권한 없음.',
        });
        return;
      }
    }

    reply.content = content;
    await replyRepo.save(reply);

    logger.green('답글 수정 성공.');
    res.status(200).json({
      message: '답글 수정 성공.',
    });
  } catch (err) {
    logger.red('답글 수정 서버 오류.');
    res.status(500).json({
      message: '답글 수정 서버 오류.',
    });
  }
}