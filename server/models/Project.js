const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // URL friendly ID
    category: {
        type: String,
        enum: ['Custom Code', 'Framer', 'WordPress', 'University Project', 'College Project', 'Portfolio'],
        required: true
    },

    // Pricing
    price: { type: Number, required: true },
    originalPrice: { type: Number }, // For strikethorugh

    // Details
    description: { type: String, required: true }, // Rich text or markdown
    features: [{ type: String }],
    pagesIncluded: [{ type: String }],

    // Media
    thumbnail: { type: String, required: true },
    images: [{ type: String }], // Carousel images
    demoUrl: { type: String }, // Live preview link

    // Tech Stack
    techStack: [{ type: String }], // e.g. ["Next.js", "Tailwind"]

    // Metadata
    deliveryTime: { type: String, default: "3-5 Days" },
    isFeatured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
