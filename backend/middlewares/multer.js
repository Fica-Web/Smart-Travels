import multer from 'multer';
import path from 'path';

// Configure store
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename files
    }
})

const upload = multer({
    storage: storage,
    // limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB limit
});

export default upload;