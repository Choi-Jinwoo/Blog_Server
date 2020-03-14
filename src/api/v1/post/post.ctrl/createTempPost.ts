/**
 * 400 - 검증 오류
 * 404 - 카테고리 없음
 */
import { Response } from 'express'
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
import { validateCreateTemp } from '../../../../lib/validation/post';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Category from '../../../../entity/Category';
import Post from '../../../../entity/Post';

export default async (req: AuthRequest, res: Response) => {
  if (!validateCreateTemp(req, res)) return;

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
    let category: Category
    if (data.category_idx) {
      const categoryRepo = getRepository(Category);
      category = await categoryRepo.findOne({
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
    }

    const postRepo = getRepository(Post);
    const post = new Post;

    post.title = data.title;
    post.content = data.content || '임시저장 내용';
    post.is_private = data.is_private === true ? true : false;
    post.is_temp = true;
    post.thumbnail = data.thumbnail;
    post.category = category;
    post.user = user;
    await postRepo.save(post);

    logger.green('글 임시 저장 성공.');
    res.status(200).json({
      message: '글 임시 저장 성공.',
    });

  } catch (err) {
    logger.red('글 임시 저장 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}