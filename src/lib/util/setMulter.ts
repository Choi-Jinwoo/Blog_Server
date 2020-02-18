import multer, { Options } from 'multer';
import generateUUID from './generateUUID';

export default (): any => {
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, './public/');
    },
    filename: (_req, file, cb) => {
      cb(null, `${file.fieldname}-${generateUUID()}-${file.originalname}`);
    },
  });

  const options: Options = {
    storage,
  };

  return multer(options) as any;
};
