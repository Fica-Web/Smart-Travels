import express from 'express';
const router = express.Router();
import verifyAdmin from '../middlewares/adminAuth.js';
import upload from '../middlewares/multer.js';
import {
    getBlogs,
    createBlog,
    getSingleBlog,
    getLatestBlogs,
    updateBlog,
    deleteBlog,
} from '../controllers/blogsController.js';

router.get('/', getBlogs);
router.get('/:id', getSingleBlog);
router.get('/latest/:id', getLatestBlogs);

// This middleware will be applied to all the route below this middleware
router.use(verifyAdmin); // Ensure admin authentication for the following routes

router.post('/', upload.single('coverImage'), createBlog);
router.put('/:id', upload.single('coverImage'), updateBlog);
router.delete('/:id', deleteBlog);

export default router;