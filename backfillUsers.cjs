// Script to manually create Users from confirmed Enrollments with avatars
require('dotenv').config({ path: './server/.env' });
const mongoose = require('mongoose');
const Enrollment = require('./server/models/Enrollment');
const User = require('./server/models/User');
const { generateUserAvatar } = require('./server/utils/avatarGenerator');

async function backfillUsers() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected successfully!');

        // Find all confirmed enrollments
        const confirmedEnrollments = await Enrollment.find({ status: 'confirmed' });
        console.log(`Found ${confirmedEnrollments.length} confirmed enrollments`);

        for (const enrollment of confirmedEnrollments) {
            console.log(`\nProcessing: ${enrollment.email}`);

            // Generate avatar
            const avatarUrl = generateUserAvatar(enrollment.email, enrollment.name);
            console.log(`Generated avatar: ${avatarUrl}`);

            // Create or update user
            const user = await User.findOneAndUpdate(
                { email: enrollment.email },
                {
                    name: enrollment.name,
                    email: enrollment.email,
                    role: 'student',
                    photo: avatarUrl,
                    enrolledModules: ['module-1']
                },
                { upsert: true, new: true }
            );

            console.log(`✓ User created/updated for ${enrollment.email}`);
            console.log(`  Avatar: ${user.photo}`);
        }

        console.log('\n✅ Backfill complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

backfillUsers();
