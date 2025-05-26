import express from 'express';
import { getSettings } from '../controllers/settingsController';
import verifyAdmin from '../middlewares/adminAuth';

const router = express.Router();

router.get('/', getSettings);

router.use(verifyAdmin);

export default router;
