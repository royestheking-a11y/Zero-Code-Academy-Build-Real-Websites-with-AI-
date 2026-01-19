const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    packageName: { type: String },
    packageId: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discount: { type: Number, default: 0 },
    coupon: { type: String },
    paymentMethod: { type: String }, // bkash, nagad, rocket
    trxId: { type: String },
    referenceCode: { type: String },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    enrolledAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
