/**
 * 400 - 검증 오류
 * 404 - 카테고리 없음
 */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validateModify } from '../../../../lib/validation/category';
import logger from '../../../../lib/logger';
import Category from '../../../../entity/Category';

export default async (req: Request, res: Response) => {
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
    name: string;
    fk_category_idx: number | null;
  };
  const { name, fk_category_idx }: RequestBody = req.body;

  try {
    const categoryRepo = getRepository(Category);
    const category: Category = await categoryRepo.findOne({
      where: {
        idx,
      },
    });

    if (!category) {
      res.status(404).json({
        message: '카테고리 없음.',
      });
      return;
    }

    /**
     * 외부 카테고리가 fk_category_idx가 있음
     * 내부 카테고리가 fk_category_idx가 없음
     * 검증오류
     */
    if (category.is_wrapper === Number.isInteger(fk_category_idx)) {
      res.status(400).json({
        message: '검증 오류.',
      });
      return;
    }

    category.name = name;
    category.fk_category_idx = fk_category_idx;
    categoryRepo.save(category);

    logger.green('카테고리 수정 성공.');
    return res.status(200).json({
      message: '카테고리 수정 성공.',
    });
  } catch (err) {
    logger.red('카테고리 수정 서버 오류.');
    return res.status(500).json({
      message: '서버 오류.',
    });
  }
};
