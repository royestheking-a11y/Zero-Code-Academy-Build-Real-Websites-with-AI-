const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    endpoint: String,
    expirationTime: { type: Number, default: null },
    keys: {
        p256dh: String,
        auth: String
    },
    userEmail: { type: String, default: null }, // Optional: Link to user
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
