import { Router } from 'express';
import { getSalesAnalytics, getRecentSales } from '../controllers/salesController';

const router = Router();

router.get('/analytics', getSalesAnalytics);
router.get('/recent', getRecentSales);

export default router;
