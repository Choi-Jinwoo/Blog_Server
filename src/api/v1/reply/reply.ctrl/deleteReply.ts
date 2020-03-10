import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Reply from '../../../../entity/Reply';
import Post from '../../../../entity/Post';
import Comment from '../../../../entity/Comment';

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
    const replyRepo = getRepository(Reply);
    const reply = await replyRepo.findOne({
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

    await replyRepo.remove(reply);

    // 해당 댓글의 답글 조회
    const commentReplys: Reply[] = await replyRepo.find({
      where: {
        fk_comment_idx: comment.idx,
      }
    });

    // 답글이 없을 경우 has_replies -> false
    if (commentReplys.length === 0) {
      comment.has_replies = false;
      await commentRepo.save(comment);
    }

    logger.green('답글 삭제 성공.');
    res.status(200).json({
      message: '답글 삭제 성공.',
    });
  } catch (err) {
    logger.red('답글 삭제 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}