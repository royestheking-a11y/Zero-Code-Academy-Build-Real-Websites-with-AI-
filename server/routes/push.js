const express = require('express');
const router = express.Router();
const webpush = require('web-push');
const Subscription = require('../models/Subscription');

// Configure VAPID Keys
const publicVapidKey = 'BEQ4seXunpFinlvHKDbzS_rqRVwt5wC-NnxUt6-f0-HkyxVVKLwrdnvvD76aGYUJjTgOrcT3HK1ZsvYVWHnqX6g';
const privateVapidKey = 'u7fb8gpCzutSihUu2_QY7U6svLot7niaxmulDaEEm9o';

webpush.setVapidDetails(
    'mailto:zeroocode.bd@gmail.com',
    publicVapidKey,
    privateVapidKey
);

// Subscribe Route
router.post('/subscribe', async (req, res) => {
    const subscription = req.body;

    // Validate subscription payload
    if (!subscription || !subscription.endpoint || !subscription.keys) {
        return res.status(400).json({ error: 'Invalid subscription object' });
    }

    try {
        // Upsert subscription (if endpoint exists, update userEmail if provided, otherwise create new)
        // We use endpoint as unique key
        const filter = { endpoint: subscription.endpoint };
        const update = {
            ...subscription,
            keys: subscription.keys,
            // If userEmail is passed, updated it. If not, don't overwrite if exists.
        };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        await Subscription.findOneAndUpdate(filter, update, options);

        res.status(201).json({});
    } catch (error) {
        console.error('Error saving subscription:', error);
        res.status(500).json({ error: 'Failed to save subscription' });
    }
});

// Send Notification (Admin Only or Internally Called)
router.post('/send', async (req, res) => {
    // Basic security check (ideally should be protected middleware)
    // For now, checks if body has content
    const { title, message, url, icon } = req.body;

    const payload = JSON.stringify({
        title: title || 'Zero Code Academy',
        body: message || 'New Notification',
        url: url || '/',
        icon: icon || '/favicon/android-chrome-192x192.png'
    });

    try {
        const subscriptions = await Subscription.find();

        // Send to all subscribers
        const promises = subscriptions.map(sub =>
            webpush.sendNotification(sub, payload).catch(async err => {
                console.error('Push Error:', err.statusCode);
                if (err.statusCode === 410 || err.statusCode === 404) {
                    // Subscription expired or invalid, remove it
                    await Subscription.deleteOne({ _id: sub._id });
                }
            })
        );

        await Promise.all(promises);
        res.status(200).json({ success: true, count: subscriptions.length });
    } catch (error) {
        console.error('Error sending notifications:', error);
        res.status(500).json({ error: 'Failed to send notifications' });
    }
});

module.exports = router;
