const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo: { type: String },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    enrolledModules: [{ type: String }], // Array of Module IDs
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
