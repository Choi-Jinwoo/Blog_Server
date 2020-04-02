import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validateModifyOrderNumber } from '../../../../lib/validation/category';
import logger from '../../../../lib/logger';
import Category from '../../../../entity/Category';
import compareArray from '../../../../lib/util/compareArray';

/**
 * @param { Array<number> } order_number
 * 클라이언트에 의해 정렬된 CategoryIdx 배열
 */
export default async (req: Request, res: Response) => {
  if (!validateModifyOrderNumber(req, res)) return;

  type RequestBody = {
    order_number: number[];
  };

  const { order_number }: RequestBody = req.body;
  try {
    const categoryRepo = getRepository(Category);
    const categories: Category[] = await categoryRepo.find({
      order: {
        idx: 'ASC',
      },
    });

    const categoryIdxMapped: number[] = categories.map(
      (category) => category.idx,
    );
    const sortedOrderNumber = order_number.sort();

    /**
     * 현재의 카테고리 상태와 다르다면 검증 오류
     */
    if (!compareArray(sortedOrderNumber, categoryIdxMapped)) {
      logger.yellow('검증 오류.', 'Array is Not Same');
      res.status(400).json({
        message: '검증 오류',
      });
      return;
    }

    const categoryUpdatePromise: Promise<Category>[] = [];

    for (let i = 0; i < order_number.length; i += 1) {
      const updateCategoryIdx = order_number[i];
      // categoryIdxMapped의 해당 updateCategoryIdx의 배열 Index
      const categoryIdxIndexOfIdxMapped = categoryIdxMapped.indexOf(
        updateCategoryIdx,
      );
      const category = categories[categoryIdxIndexOfIdxMapped];

      category.order_number = i;
      categoryUpdatePromise.push(categoryRepo.save(category));
    }

    await Promise.all(categoryUpdatePromise);

    logger.green('카테고리 정렬 순서 변경 성공.');
    res.status(200).json({
      message: '카테고리 정렬 순서 변경 성공.',
    });
  } catch (err) {
    logger.red('서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
};
