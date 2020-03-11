/**
 * 409 - 중복된 이메일
 */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validateSubscribe } from '../../../../lib/validation/subscription';
import logger from '../../../../lib/logger';
import Subscription from '../../../../entity/Subscription';
import { sendSubscribe } from '../../../../lib/util/email';

export default async (req: Request, res: Response) => {
  if (!validateSubscribe(req, res)) return;

  type RequestBody = {
    email: string;
  };

  const { email }: RequestBody = req.body;

  try {
    const subscriptionRepo = getRepository(Subscription);
    const isExist = await subscriptionRepo.findOne({
      where: {
        email,
      },
    });

    if (isExist) {
      logger.yellow('중복된 이메일.');
      res.status(409).json({
        message: '중복된 이메일.',
      });
      return;
    }

    const subscription = new Subscription();
    subscription.email = email;
    await subscriptionRepo.save(subscription);

    logger.green('구독 성공.');
    res.status(200).json({
      message: '구독 성공.',
    });

    try {
      await sendSubscribe(email);
    } catch (err) {
      logger.red('이메일 서버 오류.', err.message);
    }
  } catch (err) {
    logger.red('구독 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}