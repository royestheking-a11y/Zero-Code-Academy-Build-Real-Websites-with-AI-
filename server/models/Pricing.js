const mongoose = require('mongoose');

const PricingSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    popular: { type: Boolean, default: false },
    benefits: [{ type: String }],
    accessLimit: { type: Number }
});

module.exports = mongoose.model('Pricing', PricingSchema);
