const express = require('express');
const router = express.Router();
const Module = require('../models/Module');
const Feature = require('../models/Feature');
const Pricing = require('../models/Pricing');
const Routine = require('../models/Routine');
const Offer = require('../models/Offer');
const DemoVideo = require('../models/DemoVideo');
const Coupon = require('../models/Coupon');
const Notification = require('../models/Notification');

const webpush = require('web-push');
const Subscription = require('../models/Subscription');

// VAPID Configuration (Same as push.js)
// VAPID Configuration (Same as push.js)
const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
    'mailto:zeroocode.bd@gmail.com',
    publicVapidKey,
    privateVapidKey
);

// Helper to send global push
const sendGlobalPush = async (title, message, url) => {
    const payload = JSON.stringify({
        title: title,
        body: message,
        url: url,
        icon: '/favicon/android-chrome-192x192.png'
    });

    try {
        const subscriptions = await Subscription.find();
        subscriptions.forEach(sub => {
            webpush.sendNotification(sub, payload).catch(err => {
                if (err.statusCode === 410 || err.statusCode === 404) {
                    Subscription.deleteOne({ _id: sub._id }).exec();
                }
            });
        });
        console.log(`Push sent to ${subscriptions.length} subscribers`);
    } catch (error) {
        console.error('Push Error:', error);
    }
};

// --- Helper to create generic CRUD ---
const createCrud = (Model) => ({
    getAll: async (req, res) => {
        try {
            const items = await Model.find();
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    create: async (req, res) => {
        try {
            const newItem = new Model(req.body);
            const saved = await newItem.save();
            res.json(saved);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    update: async (req, res) => {
        try {
            // Try update by custom 'id' first, then '_id'
            let updated = await Model.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
            if (!updated && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
                updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            }
            res.json(updated);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            // Try delete by custom 'id' first, then '_id'
            let deleted = await Model.findOneAndDelete({ id: req.params.id });
            if (!deleted && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
                deleted = await Model.findByIdAndDelete(req.params.id);
            }
            if (deleted) {
                res.json({ message: 'Deleted' });
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
});

// --- Modules ---
const moduleCtrl = createCrud(Module);
router.get('/modules', moduleCtrl.getAll);
router.post('/modules', async (req, res) => {
    try {
        const newModule = new Module(req.body);
        await newModule.save();

        // Notify all students about new module
        const User = require('../models/User');
        const students = await User.find({ role: 'student' });

        const notificationsToCreate = students.map(student => ({
            userId: student.email,
            type: 'module',
            title: 'নতুন মডিউল যুক্ত হয়েছে! 📚',
            message: `"${req.body.title}" মডিউল এখন উপলব্ধ। এখনই শুরু করুন!`,
            link: '/student-dashboard',
            read: false
        }));

        if (notificationsToCreate.length > 0) {
            await Notification.insertMany(notificationsToCreate);
            console.log(`Sent module notification to ${students.length} students`);

            // Send Push
            sendGlobalPush('নতুন মডিউল! 📚', `"${req.body.title}" এখন উপলব্ধ।`, '/student-dashboard');
        }

        res.json(newModule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.put('/modules/:id', moduleCtrl.update);
router.delete('/modules/:id', moduleCtrl.delete);

// --- Features ---
const featureCtrl = createCrud(Feature);
router.get('/features', featureCtrl.getAll);
router.post('/features', featureCtrl.create);
router.put('/features/:id', featureCtrl.update); // Logic for voting could be specific
router.delete('/features/:id', featureCtrl.delete);

// --- Pricing ---
const pricingCtrl = createCrud(Pricing);
router.get('/pricing', pricingCtrl.getAll);
router.post('/pricing', pricingCtrl.create);
router.put('/pricing/:id', pricingCtrl.update);

// --- Routine ---
const routineCtrl = createCrud(Routine);
router.get('/routine', routineCtrl.getAll);
router.post('/routine', async (req, res) => {
    try {
        const newRoutine = new Routine(req.body);
        await newRoutine.save();

        // Notify all students about new/updated routine
        const User = require('../models/User');
        const students = await User.find({ role: 'student' });

        const notificationsToCreate = students.map(student => ({
            userId: student.email,
            type: 'routine',
            title: 'নতুন ক্লাস রুটিন আপডেট! 🗓️',
            message: `"${req.body.className || 'লাইভ ক্লাস'}" এর রুটিন আপডেট করা হয়েছে। সময়: ${req.body.time || 'TBA'}`,
            link: '/live-class-routine',
            read: false
        }));

        if (notificationsToCreate.length > 0) {
            await Notification.insertMany(notificationsToCreate);
            console.log(`Sent routine notification to ${students.length} students`);

            // Send Push
            sendGlobalPush('নতুন রুটিন! 🗓️', `ক্লাস: ${req.body.className || 'লাইভ'}, সময়: ${req.body.time}`, '/live-class-routine');
        }

        res.json(newRoutine);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.put('/routine/:id', routineCtrl.update); // Added PUT
router.delete('/routine/:id', routineCtrl.delete);

// --- Offer ---
// Offer is usually a singleton, but we can treat as list or just get first
router.get('/offer', async (req, res) => {
    const offer = await Offer.findOne();
    res.json(offer || {});
});
const handleOfferUpsert = async (req, res) => {
    try {
        await Offer.deleteMany({});
        const newOffer = new Offer(req.body);
        await newOffer.save();
        res.json(newOffer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
router.post('/offer', handleOfferUpsert);
router.put('/offer', handleOfferUpsert); // Added PUT aliases to POST logic

// --- Demo Videos ---
const demoCtrl = createCrud(DemoVideo);
router.get('/demo-videos', demoCtrl.getAll);
router.post('/demo-videos', demoCtrl.create);
router.put('/demo-videos/:id', demoCtrl.update); // Added PUT
router.delete('/demo-videos/:id', demoCtrl.delete);

// --- Coupons ---
const couponCtrl = createCrud(Coupon);
router.get('/coupons', couponCtrl.getAll);
router.post('/coupons', couponCtrl.create);
router.delete('/coupons/:id', couponCtrl.delete);

// --- Notifications ---
router.get('/notifications', async (req, res) => {
    try {
        const { userId } = req.query; // Filter by user (email or ID)
        const filter = userId ? { userId } : {};
        const items = await Notification.find(filter).sort({ timestamp: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/notifications', async (req, res) => {
    try {
        const newItem = new Notification(req.body);
        const saved = await newItem.save();

        // Send Push for manual notifications too
        sendGlobalPush(req.body.title, req.body.message, req.body.link);

        res.json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.put('/notifications/:id', async (req, res) => {
    try {
        // Mark as read or update
        const updated = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Mark all notifications as read for a user
router.put('/notifications/:userId/read', async (req, res) => {
    try {
        const result = await Notification.updateMany(
            { userId: req.params.userId, read: false },
            { $set: { read: true } }
        );
        res.json({ message: 'Marked all as read', modifiedCount: result.modifiedCount });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
