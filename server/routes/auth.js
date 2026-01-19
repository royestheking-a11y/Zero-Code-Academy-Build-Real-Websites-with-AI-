const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateUserAvatar } = require('../utils/avatarGenerator');

// Login or Auto-Register
// Login or Auto-Register based on Enrollment
router.post('/login', async (req, res) => {
    const { email, deviceId } = req.body;

    try {
        let user = await User.findOne({ email });

        // If user doesn't exist, check VALID ENROLLMENTS
        if (!user) {
            const Enrollment = require('../models/Enrollment');
            // Check for confirmed enrollment
            const enrollment = await Enrollment.findOne({ email, status: 'confirmed' });

            if (enrollment) {
                // Auto-create user from enrollment with unique avatar
                const avatarUrl = generateUserAvatar(enrollment.email, enrollment.name);
                user = new User({
                    name: enrollment.name,
                    email: enrollment.email,
                    role: 'student',
                    enrolledModules: ['module-1'], // Default access or derive from package
                    photo: avatarUrl,
                    sessions: [{
                        deviceId: deviceId || 'unknown',
                        lastLogin: new Date(),
                        ip: req.ip
                    }]
                });
                await user.save();
                console.log('Created user from approved enrollment:', email);
                console.log('Assigned avatar:', avatarUrl);

                // Send welcome notification
                const Notification = require('../models/Notification');
                await Notification.create({
                    userId: email,
                    type: 'system',
                    title: 'স্বাগতম Zero Code Academy-এ!',
                    message: `হ্যালো ${enrollment.name}! আপনার কোর্সে স্বাগতম। আপনার লার্নিং জার্নি শুরু হয়ে গেছে।`,
                    link: '/student-dashboard',
                    read: false
                });
                console.log('Welcome notification created for:', email);
            } else {
                return res.status(401).json({ message: 'আপনার অ্যাকাউন্ট অ্যাপ্রুভ হয়নি অথবা এনরোলমেন্ট খুঁজে পাওয়া যায়নি।' });
            }
        } else {
            // User exists - Handle Device Consistency
            if (deviceId) {
                if (!user.sessions) user.sessions = [];

                // Remove current device if present (to update timestamp)
                user.sessions = user.sessions.filter(s => s.deviceId !== deviceId);

                // Add new session
                user.sessions.push({
                    deviceId,
                    lastLogin: new Date(),
                    ip: req.ip
                });

                // Sort by lastLogin (newest first)
                user.sessions.sort((a, b) => b.lastLogin - a.lastLogin);

                // Enforce Max 2 Devices
                if (user.sessions.length > 2) {
                    console.log(`User ${email} exceeded device limit. Removing oldest session.`);
                    user.sessions = user.sessions.slice(0, 2);
                }

                await user.save();
            }
        }

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                photo: user.photo,
                enrolledModules: user.enrolledModules
            },
            token: 'mock-jwt-token'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get User Profile

// Update User Profile
router.put('/:email', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { email: req.params.email },
            req.body,
            { new: true, upsert: true } // Create if not exists
        );
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
