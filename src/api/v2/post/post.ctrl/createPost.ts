/**
 * 400 - 검증 오류
 * 404 - 카테고리 없음
 */
import { Response } from 'express'
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
import { validateCreate } from '../../../../lib/validation/post';
import logger from '../../../../lib/logger';
import Category from '../../../../entity/Category';
import Post from '../../../../entity/Post';
import { sendNewPost } from '../../../../lib/util/email';

export default async (req: AuthRequest, res: Response) => {
  if (!validateCreate(req, res)) return;

  type RequestBody = {
    title: string;
    content: string;
    is_private: boolean;
    category_idx: number;
    thumbnail: string | null;
    is_temp: boolean;
  };

  const data: RequestBody = req.body;

  try {
    const categoryRepo = getRepository(Category);
    const postRepo = getRepository(Post);

    const category: Category = await categoryRepo.findOne({
      where: {
        idx: data.category_idx,
        is_wrapper: false,
      },
    });

    if (!category) {
      logger.yellow('카테고리 없음.');
      res.status(404).json({
        message: '카테고리 없음.',
      });
      return;
    }

    const post = new Post();

    post.title = data.title;
    post.content = data.content;
    post.is_private = data.is_private;
    post.is_temp = data.is_temp;
    post.thumbnail = data.thumbnail;
    post.category = category;

    // 임시저장이 아닐경우 (릴리즈))
    if (!post.is_temp) {
      post.released_at = new Date();
    }

    await postRepo.save(post);

    logger.green('글 생성 성공.');
    res.status(200).json({
      message: '글 생성 성공.',
    });

    if (post.is_private || post.is_temp) return;

    try {
      await sendNewPost(post.title);
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