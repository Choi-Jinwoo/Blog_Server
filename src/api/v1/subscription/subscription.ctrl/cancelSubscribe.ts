import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validateCancelSubscribe } from '../../../../lib/validation/subscription';
import logger from '../../../../lib/logger';
import Subscription from '../../../../entity/Subscription';
import { sendCancelSubscribe } from '../../../../lib/util/email';

export default async (req: Request, res: Response) => {
  if (!validateCancelSubscribe(req, res)) return;

  type RequestBody = {
    email: string;
  };

  const { email }: RequestBody = req.body;

  try {
    const subscriptionRepo = getRepository(Subscription);
    const subscription = await subscriptionRepo.findOne({
      where: {
        email,
      },
    });

    if (!subscription) {
      logger.yellow('없는 구독자.');
      res.status(404).json({
        message: '없는 구독자.',
      });
      return;
    }

    await subscriptionRepo.remove(subscription);

    logger.green('구독 취소 성공.');
    res.status(200).json({
      message: '구독 취소 성공.',
    });

    try {
      await sendCancelSubscribe(email);
    } catch (err) {
      logger.red('이메일 서버 오류.', err.message);
    }
  } catch (err) {
    logger.red('구독 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    })
  }
}

