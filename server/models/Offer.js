const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
    isActive: { type: Boolean, default: true },
    endTime: { type: String },
    title: { type: String }
});

module.exports = mongoose.model('Offer', OfferSchema);
