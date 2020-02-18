// TODO querystring을 통해 정렬 구현 & is_deleted, is_private 고려
import { Response } from 'express';
import AuthRequest from '../../../../type/AuthRequest';
import { getRepository, FindManyOptions } from 'typeorm';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';
import Category from '../../../../entity/Category';
import Post from '../../../../entity/Post';
import orderTypes from '../../../../enum/orderType';

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  type RequestQuery = {
    category: number;
    order: string;
  };
  const query: RequestQuery = req.query;

  const queryConditions: FindManyOptions = {
    select: [
      'idx',
      'title',
      'created_at',
      'fk_user_id',
      'fk_category_idx',
    ],
    where: {
      is_deleted: false,
      is_private: false,
      category: null,
    },
    order: null,
  }

  try {
    // category 존재 할 경우
    if (query.category) {
      const categoryRepo = getRepository(Category);
      const category = await categoryRepo.findOne({
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