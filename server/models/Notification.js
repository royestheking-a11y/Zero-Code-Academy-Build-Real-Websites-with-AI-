const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    type: { type: String, enum: ['payment', 'enrollment', 'routine', 'system', 'module', 'order'] },
    title: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    link: { type: String }
});

module.exports = mongoose.model('Notification', NotificationSchema);
