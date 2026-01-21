require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project'); // Adjust path as needed

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/zero-code')
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const seedProjects = [
    {
        title: 'Modern SaaS Landing Page',
        slug: 'modern-saas-landing',
        category: 'Custom Code',
        price: 5000,
        originalPrice: 8000,
        description: 'A high-converting SaaS landing page built with React, Tailwind CSS, and Framer Motion. Includes pricing section, testimonials, and feature grid.',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        techStack: ['React', 'Tailwind', 'Framer Motion'],
        isFeatured: true,
        demoUrl: 'https://example.com'
    },
    {
        title: 'University Management Portal',
        slug: 'university-portal',
        category: 'University Project',
        price: 8000,
        originalPrice: 12000,
        description: 'Complete MERN stack student management system with Admin, Teacher, and Student dashboards.',
        thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
        techStack: ['MongoDB', 'Express', 'React', 'Node.js'],
        isFeatured: true, // For homepage
        demoUrl: 'https://example.com'
    },
    {
        title: 'Creative Agency Portfolio',
        slug: 'creative-portfolio',
        category: 'Framer',
        price: 3000,
        description: 'Stunning no-code portfolio template for agencies and freelancers. Smooth animations and CMS integration.',
        thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
        techStack: ['Framer', 'No-Code'],
        isFeatured: false,
        demoUrl: 'https://example.com'
    },
    {
        title: 'Fashion E-commerce Store',
        slug: 'ecommerce-store',
        category: 'WordPress',
        price: 4500,
        originalPrice: 6000,
        description: 'Fully functional WooCommerce store with cart, checkout, and payment gateway integration setup.',
        thumbnail: 'https://images.unsplash.com/photo-1472851294608-415105022054?auto=format&fit=crop&q=80&w=800',
        techStack: ['WordPress', 'WooCommerce', 'Elementor'],
        isFeatured: true, // For homepage
        demoUrl: 'https://example.com'
    },
    {
        title: 'Tech Blog Pro',
        slug: 'tech-blog-pro',
        category: 'Custom Code',
        price: 4000,
        description: 'SEO optimized blog template using Next.js and MDX. Perfect for developers and tech writers.',
        thumbnail: 'https://images.unsplash.com/photo-1499750310159-525446b08ef5?auto=format&fit=crop&q=80&w=800',
        techStack: ['Next.js', 'MDX', 'Tailwind'],
        isFeatured: false,
        demoUrl: 'https://example.com'
    },
    {
        title: 'Personal Portfolio v1',
        slug: 'personal-portfolio-v1',
        category: 'Portfolio',
        price: 1500,
        description: 'Simple and clean portfolio for students and freshers.',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
        techStack: ['HTML', 'CSS', 'JS'],
        isFeatured: false,
        demoUrl: 'https://example.com'
    }
];

const seedDB = async () => {
    try {
        await Project.deleteMany({});
        console.log('Removed existing projects');

        await Project.insertMany(seedProjects);
        console.log('Seeded Projects Successfully');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
