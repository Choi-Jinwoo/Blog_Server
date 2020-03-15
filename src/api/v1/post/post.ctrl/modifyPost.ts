/**
 * 400 - 검증 오류
 * 403 - 권한 없음
 * 404 - 글 없음 / 카테고리 없음 
 */
import { Response } from 'express'
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository } from 'typeorm';
import { validateModify } from '../../../../lib/validation/post';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Category from '../../../../entity/Category';
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
    title: string;
    content: string;
    is_private: boolean;
    is_temp: boolean;
    category_idx: number;
    thumbnail: string;
  };

  const data: RequestBody = req.body;

  try {
    const postRepo = getRepository(Post);
    const post: Post = await postRepo.findOne({
      where: {
        idx,
        is_deleted: false,
      },
    });

    // 글 존재 유뮤 확인
    if (!post) {
      logger.yellow('글 없음.');
      res.status(404).json({
        message: '글 없음.',
      });
      return;
    }

    // 권한 확인
    if (post.fk_user_id !== user.id) {
      logger.yellow('권한 없음.');
      res.status(403).json({
        message: '권한 없음.',
      });
      return;
    }

    // 카테고리 존재 유무 확인
    if (data.category_idx) {
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

      post.category = category;
    }

    // 임시 저장 해제시 작성 시간 변경
    if (!data.is_temp && post.is_temp) {
      post.created_at = new Date();
    }

    post.title = data.title || post.title;
    post.content = data.content || post.content;
    post.is_private = !!data.is_private;
    post.is_temp = !!data.is_temp;
    post.thumbnail = data.thumbnail;
    await postRepo.save(post);

    logger.green('글 수정 성공.');
    res.status(200).json({
      message: '글 수정 성공',
    });
  } catch (err) {
    logger.red('글 수정 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}