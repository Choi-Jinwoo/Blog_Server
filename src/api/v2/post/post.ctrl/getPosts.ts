/**
 * 400 - 검증 오류
 * 404 - 카테고리 없음
 */
import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository, FindManyOptions } from 'typeorm';
import logger from '../../../../lib/logger';
import Category from '../../../../entity/Category';
import Post from '../../../../entity/Post';
import orderTypes from '../../../../enum/orderType';
import generateURL from '../../../../lib/util/generateURL';

export default async (req: AuthRequest, res: Response) => {
  type RequestQuery = {
    category: number;
    order: string;
    page: number;
    limit: number;
  };
  const query: RequestQuery = req.query;

  if (query.page < 1) {
    logger.yellow('검증 오류', 'page is not valid');
    res.status(400).json({
      message: '검증 오류.',
    });
    return;
  }

  const queryConditions: FindManyOptions = {
    select: [
      'idx',
      'title',
      'fk_category_idx',
      'thumbnail',
      'view',
      'released_at',
      'updated_at',
    ],
    where: {
      is_deleted: false,
      is_private: false,
      is_temp: false,
      category: null,
    },
    order: null,
    skip: (query.page - 1) * query.limit,
    take: query.limit,
  };

  try {
    const postRepo = getRepository(Post);

    // category 존재 할 경우
    if (query.category) {
      const categoryRepo = getRepository(Category);
      const category: Category = await categoryRepo.findOne({
        where: {
          idx: query.category,
          is_wrapper: false,
        },
      });

      if (!category) {
        logger.yellow('카테고리 없음');
        res.status(404).json({
          message: '카테고리 없음',
        });
        return;
      }

      queryConditions.where['category'] = category;
    } else {
      delete queryConditions.where['category'];
    }

    // order 존재할 경우
    if (query.order) {
      if (!(query.order in orderTypes)) {
        logger.yellow('검증 오류.', 'bad query (order)');
        res.status(400).json({
          message: '검증 오류.',
        });
        return;
      }

      if (query.order === orderTypes.LATEST) {
        queryConditions.order = {
          released_at: 'DESC',
        };
      }
      else if (query.order === orderTypes.HIT) {
        queryConditions.order = {
          view: 'DESC',
          released_at: 'DESC',
        };
      }
    } else {
      queryConditions.order = {
        released_at: 'DESC',
      };
    }

    // 관리자일 경우 비공개 게시글 포함
    if (req.admin)
      delete queryConditions.where['is_private'];

    const posts: Post[] = await postRepo.find(queryConditions);

    posts.forEach(post => {
      if (post.thumbnail)
        post.thumbnail = generateURL(req, post.thumbnail);
    });

    logger.green('글 전체 조회 성공.');
    res.status(200).json({
      message: '글 전체 조회 성공.',
      data: {
        posts,
      },
    });
  } catch (err) {
    logger.red('글 전체 조회 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    })
  }
}