import { Router } from 'express';
import createURL from './file.ctrl/createURL';

const router = Router();

router.post('/create-url', createURL);

export default router;
