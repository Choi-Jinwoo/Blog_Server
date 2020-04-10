/**
 * 400 - 검증 오류
 * 404 - 외부 카테고리 없음
 * 409 - 중복된 카테고리
 */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validateCreate } from '../../../../lib/validation/category';
import logger from '../../../../lib/logger';
import Category from '../../../../entity/Category';

export default async (req: Request, res: Response) => {
  if (!validateCreate(req, res)) return;

  type RequestBody = {
    name: string;
    fk_category_idx: number;
  };
  const { name, fk_category_idx }: RequestBody = req.body;

  try {
    const categoryRepo = getRepository(Category);
    const isDuplicate: Category = await categoryRepo.findOne({
      where: {
        name,
      },
    });

    if (isDuplicate) {
      logger.yellow('중복된 카테고리.');
      res.status(409).json({
        message: '중복된 카테고리.',
      });
      return;
    }

    const category = new Category();
    category.name = name;

    // fk_category_idx가 있을경우 -> Wrapper Category가 아님
    if (Number.isInteger(fk_category_idx)) {
      const wrapperCategory: Category = await categoryRepo.findOne({
        where: {
          idx: fk_category_idx,
        }
      });

      if (!wrapperCategory) {
        res.status(404).json({
          message: '카테고리 없음.',
        });
        return;
      }

      category.is_wrapper = false;
      category.wrapper_category = wrapperCategory;
    } else {
      category.is_wrapper = true;
      category.wrapper_category = null;
    }

    await categoryRepo.save(category);
    logger.green('카테고리 생성 성공.');
    return res.status(200).json({
      message: '카테고리 생성 성공.',
    });
  } catch (err) {
    logger.red('카테고리 생성 서버 오류.', err.message);
    return res.status(500).json({
      message: '서버 오류.',
    });
  }
};
