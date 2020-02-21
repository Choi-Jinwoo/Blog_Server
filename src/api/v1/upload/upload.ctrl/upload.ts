import { Response } from 'express';
import logger from '../../../../lib/logger';

export default async (req, res: Response) => {
  const reqFiles = req.files;
  const files: string[] = [];

  reqFiles.forEach(reqFile => {
    files.push(reqFile.filename);
  });

  logger.green('파일 업로드 성공.');
  res.status(200).json({
    message: '파일 업로드 성공.',
    data: {
      files,
    },
  });
}