const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create Order (Public/User)
router.post('/', async (req, res) => {
    try {
        // Generate Order ID (simple logic: ZC + timestamp slice)
        const orderId = 'ZC-' + Date.now().toString().slice(-6);

        const newOrder = new Order({
            ...req.body,
            orderId
        });

        const saved = await newOrder.save();

        // Create initial notification for the user
        const Notification = require('../models/Notification');
        await new Notification({
            userId: saved.email,
            type: 'order',
            title: 'Order Placed',
            message: `Order #${saved.orderId} placed successfully. Status: ${saved.status}.`,
            link: '/student-dashboard',
            read: false
        }).save();

        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get Orders (Admin or User via Filter)
router.get('/', async (req, res) => {
    try {
        const { email, whatsapp } = req.query;
        let query = {};

        if (email) query.email = email;
        if (whatsapp) query.whatsapp = whatsapp;

        const orders = await Order.find(query).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Single Order (Track Order)
router.get('/:orderId', async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Order Status (Admin)
router.put('/:id/status', async (req, res) => {
    try {
        const { status, paymentStatus } = req.body;
        const updateData = {};
        if (status) updateData.status = status;
        if (paymentStatus) updateData.paymentStatus = paymentStatus;
        updateData.updatedAt = Date.now();

        const updated = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true });

        // Trigger Notification
        if (updated) {
            const Notification = require('../models/Notification');

            let message = '';
            if (status) message = `Your order ${updated.orderId} is now ${status}.`;
            if (paymentStatus === 'Paid') message = `Payment received for order ${updated.orderId}. Order is now Processing.`;

            if (message) {
                await new Notification({
                    userId: updated.email,
                    type: 'order',
                    title: 'Order Update',
                    message: message,
                    link: '/student-dashboard', // Or specific order view if available
                    read: false
                }).save();
            }
        }

        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Order (Admin)
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Order.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
