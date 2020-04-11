/**
 * 400 - 검증 오류
 * 403 - 비공개 글
 * 404 - 글 없음
 */
import { Response } from 'express';
import moment from 'moment';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
import logger from '../../../../lib/logger';
import Post from '../../../../entity/Post';
import generateURL from '../../../../lib/util/generateURL';
import PostView from '../../../../entity/PostView';
import encrypt from '../../../../lib/encrypt';

export default async (req: AuthRequest, res: Response) => {
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

    // 관리자가 아닐경우 비공개 글 / 임시 저장글 조회 불가
    if ((post.is_private || post.is_temp) && !req.admin) {
      logger.yellow('권한 없음.');
      res.status(403).json({
        message: '권한 없음.',
      });
      return;
    }

    // 임시 저장이 아니라면 글 view 증가
    if (!post.is_temp) {
      const postViewRepo = getRepository(PostView);

      let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      if (Array.isArray(ip)) {
        ip = ip[0];
      }

      const encryptedIp = encrypt(ip);
      const viewed = await postViewRepo.findOne({
        where: {
          ip: encryptedIp,
          fk_post_idx: post.idx,
        },
        order: {
          created_at: 'DESC',
        },
      });

      const currentTime = moment();

      // 조회 한적 없다면 조회수 증가 혹은 조회수가 있고 일정 시간이 지났다면 증가
      if (!viewed || (viewed && currentTime.diff(moment(viewed.created_at), 'minutes') > 60)) {
        post.view += 1;
        await postRepo.save(post);

        const postView = new PostView();
        postView.ip = encryptedIp;
        postView.post = post;
        postViewRepo.save(postView);
      }
    }

    if (req.query.image !== 'raw') {
      if (post.thumbnail)
        post.thumbnail = generateURL(req, post.thumbnail);
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
    logger.red('서버 오류.', err);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}
