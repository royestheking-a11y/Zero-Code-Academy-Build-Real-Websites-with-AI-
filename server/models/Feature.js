const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    iconName: { type: String }, // Store icon name as string
    title: { type: String, required: true },
    description: { type: String },
    fullDescription: { type: String },
    benefits: [{ type: String }],
    tools: [{ type: String }]
});

module.exports = mongoose.model('Feature', FeatureSchema);
