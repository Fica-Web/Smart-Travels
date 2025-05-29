import express from 'express';
const router = express.Router();
import verifyAdmin from '../middlewares/adminAuth.js';
import upload from '../middlewares/multer.js';
import {
    getAllDestinations,
    getDestinationDetails,
    createDestination,
    updateDestination,
    deleteDestination,
    getPublishedDestinations,
    getDestinationById,
} from '../controllers/destinationController.js';

router.get('/is-published', getPublishedDestinations);
router.get('/:id', getDestinationById); // Fetch by ID
router.get('/:slug', getDestinationDetails); // Fetch by slug

router.use(verifyAdmin); // Ensure admin authentication for the following routes

router.get('/', getAllDestinations);
router.post('/', upload.single('coverImage'), createDestination);
router.put('/:id', upload.single('coverImage'), updateDestination);
router.delete('/:id', deleteDestination);

export default router;