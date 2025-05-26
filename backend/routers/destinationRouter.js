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
} from '../controllers/destinationController.js';

router.get('/is-published', getPublishedDestinations);
router.get('/:slug', getDestinationDetails);

router.use(verifyAdmin); // Ensure admin authentication for the following routes

router.get('/', getAllDestinations);
router.post('/', upload.single('coverImage'), createDestination);
router.put('/:id', upload.single('coverImage'), updateDestination);
router.delete('/:id', deleteDestination);

export default router;