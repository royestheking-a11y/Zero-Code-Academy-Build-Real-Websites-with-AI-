const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const User = require('./models/User');
const Enrollment = require('./models/Enrollment');

const migrateUsersToEnrollments = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Migration');

        // Get all users
        const users = await User.find({});
        console.log(`Found ${users.length} users`);

        for (const user of users) {
            // Check if enrollment already exists
            const existingEnrollment = await Enrollment.findOne({ email: user.email });
            if (existingEnrollment) {
                console.log(`ℹ️ Enrollment already exists for: ${user.email}`);
                continue;
            }

            // Create enrollment from user data
            const enrollment = new Enrollment({
                name: user.name,
                email: user.email,
                mobile: user.mobile || '01700000000', // Default if missing
                packageName: 'Zero Code Course',
                price: 9990, // Default price
                originalPrice: 25000,
                discount: 0,
                status: 'confirmed', // Auto-confirm existing users
                enrolledAt: user.createdAt || new Date()
            });

            await enrollment.save();
            console.log(`✅ Created enrollment for: ${user.email}`);
        }

        console.log('\n🎉 Migration complete!');
        process.exit(0);
    } catch (error) {
        console.error('Migration Error:', error);
        process.exit(1);
    }
};

migrateUsersToEnrollments();
