/**
 * 400 - 검증 오류
 * 404 - 이메일 없음
 */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validateSendAuthCode } from '../../../../lib/validation/auth';
import logger from '../../../../lib/logger';
import EmailAuthCode from '../../../../entity/EmailAuthCode';
import emailAuthTypes from '../../../../enum/emailAuthType';
import generateAuthCode from '../../../../lib/util/generateAuthCode';
import { sendEmailAuthCode } from '../../../../lib/util/email';

export default async (req: Request, res: Response) => {
  if (!validateSendAuthCode(req, res)) return;

  type RequestBody = {
    email: string;
    type: number;
  }
  let { email, type }: RequestBody = req.body;

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
    await emailAuthCodeRepo
      .createQueryBuilder()
      .delete()
      .where("type = :type AND email = :email", {
        type,
        email,   
      })
      .execute();
    
    const code = generateAuthCode();
    
    const emailAuthCode = new EmailAuthCode();
    emailAuthCode.email = email;
    emailAuthCode.code = code;
    emailAuthCode.type = type;
    emailAuthCodeRepo.save

    emailAuthCodeRepo.save(emailAuthCode);

    await sendEmailAuthCode(email, code);

    logger.green('이메일 인증 번호 전송 성공.');
    res.status(200).json({
      message: '이메일 인증 번호 전송 성공.',
    });
  } catch (err) {
    if (err.message === 'No recipients defined') {
      logger.yellow('이메일 없음.', err.message);
      res.status(404).json({
        message: '이메일 없음.',
      });
      return;
    }

    logger.red('이메일 인증 번호 전송 서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}