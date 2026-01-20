import { Router } from 'express';
import { getLabels, updateLabel, getLabelImpact } from '../controllers/labelController';

const router = Router();

router.get('/', getLabels);
router.patch('/:key', updateLabel);
router.get('/:key/impact', getLabelImpact);

export default router;
