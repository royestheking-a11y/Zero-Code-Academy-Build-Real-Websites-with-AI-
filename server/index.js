const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Basic Route
app.get('/', (req, res) => {
    res.send('Zero Code Backend is Running');
});

// Keep-Alive Endpoint for Cron-Job.org
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Import Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/content', require('./routes/content'));
app.use('/api/enrollments', require('./routes/enrollments'));
app.use('/api/push', require('./routes/push'));
app.use('/api/marketplace', require('./routes/marketplace')); // Website Marketplace
app.use('/api/orders', require('./routes/orders')); // Order Management
app.use('/api/upload', require('./routes/upload')); // File Uploads

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
