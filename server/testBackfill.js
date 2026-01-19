// Direct test script - run from server directory
require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const { generateUserAvatar } = require('./utils/avatarGenerator');
const User = require('./models/User');
const Enrollment = require('./models/Enrollment');

async function test() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Test avatar generation
        const testAvatar = generateUserAvatar('test@example.com', 'Test User');
        console.log('Test avatar:', testAvatar);

        // Get confirmed enrollments
        const enrollments = await Enrollment.find({ status: 'confirmed' });
        console.log(`\nFound ${enrollments.length} confirmed enrollments:`);

        for (const e of enrollments) {
            const avatar = generateUserAvatar(e.email, e.name);
            console.log(`\n- ${e.email}`);
            console.log(`  Avatar: ${avatar}`);

            const user = await User.findOneAndUpdate(
                { email: e.email },
                {
                    name: e.name,
                    email: e.email,
                    role: 'student',
                    photo: avatar,
                    enrolledModules: ['module-1']
                },
                { upsert: true, new: true }
            );

            console.log(`  ✓ User created/updated: ${user._id}`);
        }

        const userCount = await User.countDocuments();
        console.log(`\n✅ Total users in DB: ${userCount}`);

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

test();
