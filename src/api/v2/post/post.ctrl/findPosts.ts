import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository, FindManyOptions, Like } from 'typeorm';
import logger from '../../../../lib/logger';
import Post from '../../../../entity/Post';
import generateURL from '../../../../lib/util/generateURL';

export default async (req: AuthRequest, res: Response) => {
  const query: string = req.query.query;

  if (!query.trim().length) {
    logger.yellow('검증 오류.', 'query is empty')
    res.status(400).json({
      message: '검증 오류.'
    });
    return;
  }

  const queryConditions: FindManyOptions = {
    where: {
      is_private: false,
      is_temp: false,
      is_deleted: false,
      title: Like(`%${query}%`),
    },
    order: {
      released_at: 'DESC',
    }
  }

  // 관리자일 경우 비공개 글 포함
  if (req.admin) {
    delete queryConditions.where['is_private'];
  }

  try {
    const postRepo = getRepository(Post);
    const posts: Post[] = await postRepo.find(queryConditions)

    posts.forEach(post => {
      if (post.thumbnail)
        post.thumbnail = generateURL(req, post.thumbnail);
    });

    logger.green('글 검색 성공.');
    res.status(200).json({
      message: '글 검색 성공.',
      data: {
        posts,
      },
    });
  } catch (err) {
    logger.red('글 검색 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}