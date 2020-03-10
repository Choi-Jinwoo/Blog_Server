import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import logger from '../../../../lib/logger';
import Category from '../../../../entity/Category';

export default async (req: Request, res: Response) => {
  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow('검증 오류.', 'idx is NaN');
    res.status(400).json({
      message: '검증 오류.',
    });
    return;
  }

  try {
    const categoryRepo = getRepository(Category);
    const category: Category = await categoryRepo.findOne({
      where: {
        idx,
      },
    });

    if (!category) {
      logger.yellow('카테고리 없음.');
      res.status(404).json({
        message: '카테고리 없음.',
      });
      return;
    }

    await categoryRepo.remove(category);
    logger.green('카테고리 삭제 성공.');
    return res.status(200).json({
      message: '카테고리 삭제 성공.',
    });
  } catch (err) {
    logger.red('카테고리 삭제 서버 오류.');
    return res.status(500).json({
      message: '서버 오류.',
    });
  }
}
