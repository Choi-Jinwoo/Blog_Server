import { Router } from 'express';
import subscribe from './subscription.ctrl/subscribe';

const router = Router();

router.post('/', subscribe);

export default router;
