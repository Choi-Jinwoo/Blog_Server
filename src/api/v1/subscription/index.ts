import { Router } from 'express';
import subscribe from './subscription.ctrl/subscribe';
import cancelSubscribe from './subscription.ctrl/cancelSubscribe';

const router = Router();

router.post('/', subscribe);
router.post('/cancel', cancelSubscribe);

export default router;
