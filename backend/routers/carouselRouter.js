import express from 'express';
const router = express.Router();
import verifyAdmin from '../middlewares/adminAuth.js';
import upload from '../middlewares/multer.js';
import {
    getCarousel,
    getCarouselById,
    createCarousel,
    updateCarousel,
    deleteCarousel
} from '../controllers/carouselController.js';

router.get('/', getCarousel);
router.get('/:id', getCarouselById);

// This middleware will be applied to all the route below this middleware
router.use(verifyAdmin); // Ensure admin authentication for the following routes

router.post('/', upload.single('image'), createCarousel);
router.put('/:id', upload.single('image'), updateCarousel);
router.delete('/:id', deleteCarousel);

export default router;