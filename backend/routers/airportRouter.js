import express from 'express';
import { createAirports, getAirports, searchAirports } from '../controllers/airportController.js';

const router = express.Router();

router.post('/', createAirports);
router.get('/', getAirports);
router.get('/search', searchAirports);

export default router;