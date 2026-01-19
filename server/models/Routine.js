const mongoose = require('mongoose');

const RoutineSchema = new mongoose.Schema({
    id: { type: String, required: true },
    date: { type: String, required: true },
    day: { type: String, required: true },
    time: { type: String, required: true },
    topic: { type: String, required: true },
    platform: { type: String, required: true },
    link: { type: String, required: true },
    moduleId: { type: String }
});

module.exports = mongoose.model('Routine', RoutineSchema);
