import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository, FindManyOptions } from 'typeorm';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Category from '../../../../entity/Category';
import Post from '../../../../entity/Post';
import orderTypes from '../../../../enum/orderType';
import generateURL from '../../../../lib/util/generateURL';

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
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
      'created_at',
      'fk_user_id',
      'fk_category_idx',
      'thumbnail',
      'view',
    ],
    where: {
      is_deleted: false,
      is_private: false,
      category: null,
    },
    order: null,
    skip: (query.page - 1) * query.limit,
    take: query.limit,
  };

  try {
    // category 존재 할 경우
    if (query.category) {
      const categoryRepo = getRepository(Category);
      const category: Category = await categoryRepo.findOne({
        where: {
          idx: query.category,
        },
      });

      if (!category) {
        logger.yellow('없는 카테고리');
        res.status(404).json({
          message: '없는 카테고리',
        });
        return;
      }

      queryConditions.where['category'] = category;
    } else {
      delete queryConditions.where['category'];
    }

    // order 존재할 경우
    if (query.order) {
      if (query.order === orderTypes.latest) {
        queryConditions.order = {
          created_at: 'DESC',
        };
      } else if (query.order === orderTypes.hit) {
        queryConditions.order = {
          view: 'DESC',
          created_at: 'DESC',
        };
      } else {
        logger.yellow('검증 오류.', 'bad query (order)');
        res.status(400).json({
          message: '검증 오류.',
        });
        return;
      }
    } else {
      queryConditions.order = {
        created_at: 'DESC',
      };
    }

    // 관리자일 경우 
    if (user && user.is_admin) {
      delete queryConditions.where['is_private'];
    }
    const postRepo = getRepository(Post);
    const posts: Post[] = await postRepo.find(queryConditions);

    posts.forEach(post => {
      if (!post.thumbnail) return;
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