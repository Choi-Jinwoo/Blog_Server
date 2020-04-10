import { Request, Response } from 'express';
import { validateCreateURL } from '../../../../lib/validation/file';
import logger from '../../../../lib/logger';
import generateURL from '../../../../lib/util/generateURL';

export default async (req: Request, res: Response) => {
  if (!(validateCreateURL(req, res))) return;

  type ReqeustBody = {
    file_name: string;
  };

  const { file_name }: ReqeustBody = req.body;

  const fileURL = await generateURL(req, file_name);

  logger.green('URL 생성 성공.');
  res.status(200).json({
    message: 'URL 생성 성공.',
    data: {
      url: fileURL,
    },
  });
}