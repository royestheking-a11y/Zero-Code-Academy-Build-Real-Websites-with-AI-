const mongoose = require('mongoose');

const DemoVideoSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    youtubeUrl: { type: String, required: true },
    thumbnail: { type: String },
    duration: { type: String }
});

module.exports = mongoose.model('DemoVideo', DemoVideoSchema);
