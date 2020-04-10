import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import logger from '../../../../lib/logger';
import Category from '../../../../entity/Category';


export default async (req: Request, res: Response) => {
  try {
    const categoryRepo = getRepository(Category);
    const rawCategories: Category[] = await categoryRepo.find();

    type WrapperCategory = Category & {
      categories?: Category[];
    }

    // 외부 카테고리 filter
    const wrapperCategories: WrapperCategory[] =
      rawCategories.filter(category => category.is_wrapper);

    // 외부카테고리 배열에 내부 카테고리 삽입
    wrapperCategories.forEach(wrapperCategory => {
      const wrappedCategories: Category[] =
        rawCategories.filter(wrappedCategory => wrappedCategory.fk_category_idx === wrapperCategory.idx);

      wrapperCategory.categories = wrappedCategories;
    });

    logger.green('카테고리 목록 조회 성공.');
    res.status(200).json({
      message: '카테고리 목록 조회 성공.',
      data: {
        categories: wrapperCategories,
      },
    });
  } catch (err) {
    logger.red('카테고리 목록 조회 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
};
