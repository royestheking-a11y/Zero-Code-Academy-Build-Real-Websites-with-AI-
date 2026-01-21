const express = require('express');
const router = express.Router();
const multer = require('multer');
const File = require('../models/File');

// Configure Multer (Memory Storage) - Max 10MB
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// POST: Upload File to MongoDB
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const newFile = new File({
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            size: req.file.size,
            data: req.file.buffer
        });

        const savedFile = await newFile.save();

        // Return a URL that points to our own server's download route
        // const baseUrl = req.protocol + '://' + req.get('host'); // Use relative or env var if needed. 
        // For simplicity, returning the relative API path which frontend can prepend with API_URL

        res.status(201).json({
            message: 'File uploaded successfully',
            fileId: savedFile._id,
            // Constructing a "virtual" URL that the frontend can use to download it
            fileUrl: `/api/files/${savedFile._id}`,
            originalName: savedFile.filename
        });

    } catch (error) {
        console.error('MongoDB Upload Error:', error);
        res.status(500).json({ message: 'File upload failed: ' + error.message });
    }
});

// GET: Download File by ID
router.get('/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Set headers to force download (or display if image, but user asked for download)
        // 'attachment' forces download. 'inline' tries to display.
        res.set({
            'Content-Type': file.contentType,
            'Content-Disposition': `attachment; filename="${file.filename}"`,
            'Content-Length': file.size
        });

        res.send(file.data);

    } catch (error) {
        console.error('Download Error:', error);
        res.status(500).json({ message: 'Download failed' });
    }
});

module.exports = router;
