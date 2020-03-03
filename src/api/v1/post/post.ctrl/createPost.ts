import { Response } from 'express'
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
import { validateCreate } from '../../../../lib/validation/post';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Category from '../../../../entity/Category';
import Post from '../../../../entity/Post';
import { sendNoticeNewPost } from '../../../../lib/util/email';

export default async (req: AuthRequest, res: Response) => {
  if (!validateCreate(req, res)) return;

  const user: User = req.user;
  type RequestBody = {
    title: string;
    content: string;
    is_private: boolean;
    category_idx: number;
    thumbnail: string;
  };

  const data: RequestBody = req.body;

  try {
    const categoryRepo = getRepository(Category);
    const category: Category = await categoryRepo.findOne({
      where: {
        idx: data.category_idx,
      },
    });

    if (!category) {
      logger.yellow('카테고리 없음.');
      res.status(404).json({
        message: '카테고리 없음.',
      });
      return;
    }

    const postRepo = getRepository(Post);
    const post = new Post;
    post.title = data.title;
    post.content = data.content;
    post.is_private = data.is_private;
    post.thumbnail = data.thumbnail;
    post.category = category;
    post.user = user;
    await postRepo.save(post);

    logger.green('글 생성 성공.');
    res.status(200).json({
      message: '글 생성 성공.',
    });

    if (post.is_private) return;
    try {
      await sendNoticeNewPost(post.title);
    } catch (err) {
      logger.red('이메일 서버 오류.', err.message);
    }
  } catch (err) {
    logger.red('글 생성 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}