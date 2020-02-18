import { Router } from 'express';
import upload from './upload.ctrl/upload';
import multer, { Options } from 'multer';
import generateUUID from '../../../lib/util/generateUUID';

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

const uploadMid = multer(options) as any;

const router = Router();

router.post('/', uploadMid.array('files'), upload);

export default router;