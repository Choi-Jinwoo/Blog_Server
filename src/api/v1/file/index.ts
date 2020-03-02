import { Router } from 'express';
import createURL from './file.ctrl/createURL';
import getBasicProfileImage from './file.ctrl/getBasicProfileImage';

const router = Router();

router.post('/create-url', createURL);
router.get('/basic-profile', getBasicProfileImage);

export default router;
