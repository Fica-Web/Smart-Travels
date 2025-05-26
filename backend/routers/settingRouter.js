import express from 'express';
import { getSettings, createSettings, updateSettings } from '../controllers/settingsController.js';
import verifyAdmin from '../middlewares/adminAuth.js';

const router = express.Router();

router.get('/', getSettings);
router.post('/', createSettings);
router.patch('/', updateSettings); 

router.use(verifyAdmin);

export default router;
