import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import logger from '../../../../lib/logger';
import Subscription from '../../../../entity/Subscription';

export default async (req: Request, res: Response) => {
  try {
    const subscriptionRepo = getRepository(Subscription);
    const subscriptions = await subscriptionRepo.find();

    logger.green('구독 조회 성공.');
    res.status(200).json({
      message: '구독 조회 성공.',
      data: {
        subscriptions,
      }
    });
  } catch (err) {
    logger.red('구독 조회 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}