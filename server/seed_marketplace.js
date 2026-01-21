const mongoose = require('mongoose');
const Project = require('./models/Project');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const projects = [
    {
        title: "University Management Portal",
        slug: "university-portal-demo",
        category: "University Project",
        price: 8500,
        originalPrice: 12000,
        description: "A complete solution for university management including student portal, teacher dashboard, and result processing system. Built with MERN stack.",
        thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=3540&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=3540&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=3540&auto=format&fit=crop"
        ],
        isFeatured: true,
        techStack: ["React", "Node.js", "MongoDB", "Express"],
        deliveryTime: "3 Days"
    },
    {
        title: "Modern E-commerce Store",
        slug: "modern-ecommerce-demo",
        category: "Custom Code",
        price: 15000,
        originalPrice: 25000,
        description: "Full-featured e-commerce website with cart, checkout, payment gateway integration, and admin dashboard. Fully responsive and SEO optimized.",
        thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=3540&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=3540&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1556742102-de55ab11eef7?q=80&w=3540&auto=format&fit=crop"
        ],
        isFeatured: true,
        techStack: ["Next.js", "Stripe", "TailwindCSS"],
        deliveryTime: "5 Days"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/zero-code-hub");
        console.log("Connected to DB");

        // Check if they exist to avoid duplicates
        for (const p of projects) {
            const exists = await Project.findOne({ slug: p.slug });
            if (!exists) {
                await Project.create(p);
                console.log(`Created: ${p.title}`);
            } else {
                console.log(`Skipped (Exists): ${p.title}`);
            }
        }

        console.log("Seeding complete!");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
