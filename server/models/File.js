const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true }, // Storing binary data directly
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', FileSchema);
