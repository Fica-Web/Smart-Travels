import express from 'express';
import { getSettings, createSettings } from '../controllers/settingsController';
import verifyAdmin from '../middlewares/adminAuth';

const router = express.Router();

router.get('/', getSettings);
router.post('/', createSettings);

router.use(verifyAdmin);

export default router;
