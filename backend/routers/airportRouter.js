import express from 'express';
import { createAirports, getAirports } from '../controllers/airportController.js';

const router = express.Router();

router.post('/', createAirports);
router.get('/', getAirports);

export default router;