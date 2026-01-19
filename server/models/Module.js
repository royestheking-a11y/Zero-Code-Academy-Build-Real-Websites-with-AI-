const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    number: { type: Number },
    title: { type: String, required: true },
    shortTitle: { type: String },
    description: { type: String },
    fullDescription: { type: String },
    topics: [{ type: String }],
    projects: [{ type: String }],
    duration: { type: String },
    durationWeeks: { type: Number },
    lessons: { type: Number },
    available: { type: Boolean, default: false },
    startDate: { type: String },
    endDate: { type: String },
    iconName: { type: String },
    videoUrl: { type: String },
    liveClassLink: { type: String },
    resourceLink: { type: String },
    viewCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 }
});

module.exports = mongoose.model('Module', ModuleSchema);
