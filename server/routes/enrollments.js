const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');

// Get all enrollments (for Admin)
router.get('/', async (req, res) => {
    try {
        const enrollments = await Enrollment.find().sort({ enrolledAt: -1 });
        res.json(enrollments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get enrollment by email (for checking if user is enrolled)
router.get('/check/:email', async (req, res) => {
    try {
        const enrollment = await Enrollment.findOne({ email: req.params.email });
        res.json({ enrolled: !!enrollment, enrollment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create enrollment
router.post('/', async (req, res) => {
    try {
        console.log('=== ENROLLMENT POST REQUEST ===');
        console.log('Request body:', req.body);

        // Check if already enrolled
        const existing = await Enrollment.findOne({ email: req.body.email });
        if (existing) {
            console.log('Duplicate enrollment attempt for:', req.body.email);
            console.log('Existing enrollment:', existing);
            return res.status(400).json({ message: 'এই ইমেইল ইতিমধ্যে নিবন্ধিত' });
        }

        const enrollment = new Enrollment(req.body);
        const saved = await enrollment.save();
        console.log('Enrollment saved successfully:', saved);
        res.status(201).json(saved);
    } catch (err) {
        console.error('Enrollment creation error:', err);
        res.status(400).json({ message: err.message });
    }
});

// Update enrollment status
router.put('/:id', async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        // If confirmed, sync to User collection
        if (enrollment.status === 'confirmed') {
            const User = require('../models/User');
            const { generateUserAvatar } = require('../utils/avatarGenerator');
            const avatarUrl = generateUserAvatar(enrollment.email, enrollment.name);

            await User.findOneAndUpdate(
                { email: enrollment.email },
                {
                    name: enrollment.name,
                    email: enrollment.email,
                    role: 'student',
                    photo: avatarUrl,
                    $addToSet: { enrolledModules: 'module-1' } // Default module access
                },
                { upsert: true, new: true }
            );

            // Send enrollment confirmation notification
            const Notification = require('../models/Notification');
            await Notification.create({
                userId: enrollment.email,
                type: 'enrollment',
                title: 'এনরোলমেন্ট কনফার্ম হয়েছে! 🎉',
                message: `অভিনন্দন ${enrollment.name}! আপনার এনরোলমেন্ট অনুমোদিত হয়েছে। এখন আপনি লগইন করে কোর্স শুরু করতে পারবেন।`,
                link: '/login',
                read: false
            });
            console.log('Enrollment confirmation notification sent to:', enrollment.email);
        }

        res.json(enrollment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete enrollment
router.delete('/:id', async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        // Also delete the associated User if enrollment is deleted
        const User = require('../models/User');
        await User.findOneAndDelete({ email: enrollment.email });
        console.log('Deleted user associated with enrollment:', enrollment.email);

        res.json({ message: 'Enrollment and User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
