import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository, FindManyOptions, Like } from 'typeorm';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Post from '../../../../entity/Post';
import generateURL from '../../../../lib/util/generateURL';

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const query: string = req.query.query;

  const queryConditions: FindManyOptions = {
    where: {
      is_private: false,
      is_temp: false,
      title: Like(`%${query}%`),
    },
    order: {
      created_at: 'DESC',
    }
  }

  if (user && user.is_admin) {
    delete queryConditions.where['is_private'];
  }

  try {
    const postRepo = getRepository(Post);
    const posts: Post[] = await postRepo.find(queryConditions)

    posts.forEach(post => {
      if (!post.thumbnail) return;
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