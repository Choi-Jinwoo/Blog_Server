import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import moment from 'moment';
import { validateCheckAuthCode } from '../../../../lib/validation/auth';
import logger from '../../../../lib/logger';
import EmailAuthCode from '../../../../entity/EmailAuthCode';
import emailAuthTypes from '../../../../enum/emailAuthType';

export default async (req: Request, res: Response) => {
  if (!validateCheckAuthCode(req, res)) return;

  type RequestBody = {
    email: string;
    type: number;
    code: string;
  }
  let { email, type, code }: RequestBody = req.body;

  if (!(type in emailAuthTypes)) {
    logger.yellow('검증 오류.', 'type is not in emailAuthTypes');
    res.status(400).json({
      message: '검증 오류.',
    });
    return;
  }

  email = email.trim();

  try {
    const emailAuthCodeRepo = getRepository(EmailAuthCode);
    const isExist = await emailAuthCodeRepo.findOne({
      where: {
        email,
        type
      }
    });

    if (!isExist) {
      logger.yellow('인증 정보 없음.');
      res.status(404).json({
        message: '인증 정보 없음.',
      });
      return;
    }

    const currentTime = moment();
    const codeCreatedTime = moment(isExist.created_at);

    if (currentTime.diff(codeCreatedTime, 'seconds') > 180) {
      logger.yellow('코드 만료.');
      res.status(410).json({
        message: '코드 만료.',
      });

      emailAuthCodeRepo.remove(isExist);
      return;
    }

    if (isExist.code !== code) {
      logger.yellow('인증 실패.');
      res.status(401).json({
        message: '인증 실패.',
      });
      return;
    }

    emailAuthCodeRepo.remove(isExist);
    res.status(200).json({
      message: '이메일 인증 성공.',
    });
  } catch (err) {
    logger.red('이메일 인증 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}