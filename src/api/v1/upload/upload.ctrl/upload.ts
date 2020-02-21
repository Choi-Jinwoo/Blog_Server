import { Response } from 'express';
import logger from '../../../../lib/logger';
import generateURL from '../../../../lib/util/generateURL';

export default async (req, res: Response) => {
  const reqFiles = req.files;
  const files: string[] = [];

  reqFiles.forEach(reqFile => {
    files.push(generateURL(req, reqFile.filename));
  });

  logger.green('파일 업로드 성공.');
  res.status(200).json({
    message: '파일 업로드 성공.',
    data: {
      files,
    },
  });
}