const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Unique filename: fieldname-timestamp-random.ext
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File Filter (Optional: PDF, TXT, Images)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /pdf|txt|doc|docx|png|jpg|jpeg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only .pdf, .txt, .doc, .docx and images are allowed!'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
});

// Route: POST /api/upload
router.post('/', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Construct public URL
        // Check if using local server or deployed
        // For local: http://localhost:PORT/uploads/filename
        // For local: http://localhost:PORT/uploads/filename
        const baseUrl = process.env.SERVER_URL || process.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001';
        const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

        res.status(200).json({
            message: 'File uploaded successfully',
            fileUrl: fileUrl,
            originalName: req.file.originalname
        });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ message: 'Server Error during upload' });
    }
});

module.exports = router;
