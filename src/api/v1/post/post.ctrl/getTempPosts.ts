import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository, FindManyOptions } from 'typeorm';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Post from '../../../../entity/Post';

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;

  try {
    const postRepo = getRepository(Post);
    const posts: Post[] = await postRepo.find({
      select: [
        'idx',
        'title',
      ],
      where: {
        fk_user_id: user.id,
        is_temp: true,
      },
    });

    logger.green('임시 글 조회 성공.');
    res.status(200).json({
      message: '임시 글 조회 성공.',
      data: {
        posts,
      },
    });
  } catch (err) {
    logger.green('임시 글 조회 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}