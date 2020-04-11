import { Router } from 'express';
import subscribe from './subscription.ctrl/subscribe';
import cancelSubscribe from './subscription.ctrl/cancelSubscribe';
import authMiddleware from '../../../lib/middleware/auth';
import getSubscription from './subscription.ctrl/getSubscription';

const router = Router();

router.get('/', authMiddleware, getSubscription);
router.post('/', subscribe);
router.post('/cancel', cancelSubscribe);

export default router;
