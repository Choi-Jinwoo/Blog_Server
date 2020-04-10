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
import Category from '../../../../entity/Category';
import Post from '../../../../entity/Post';

export default async (req: AuthRequest, res: Response) => {
  if (!validateModify(req, res)) return;

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
    thumbnail: string | null;
  };

  const data: RequestBody = req.body;

  try {
    const postRepo = getRepository(Post);
    const categoryRepo = getRepository(Category);

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

    // 카테고리 존재 유무 확인
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

    // 임시 저장 해제시 작성 시간 변경
    if (!data.is_temp && post.is_temp) {
      post.released_at = new Date();
    }
    // 릴리즈 게시글 -> 릴리즈 게시글로 변경 될 때 update 컬럼 변경
    else if (!data.is_temp && !post.is_temp) {
      post.updated_at = new Date();
    }

    post.title = data.title;
    post.content = data.content;
    post.is_private = data.is_private;
    post.is_temp = data.is_temp;
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