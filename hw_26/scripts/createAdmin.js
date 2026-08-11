require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const createAdmin = async () => {
    const args = process.argv.slice(2);
    const email = args[0] || process.env.ADMIN_EMAIL;
    const password = args[1] || process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        console.error('Please enter your email and password!');
        console.log('Example: node scripts/createAdmin.js admin@shop.com StrongPass123');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            console.log(`A user with the email ${email} already exists.`);
            process.exit(0);
        }

        await User.create({
            email: email.toLowerCase(),
            password: password,
            name: 'System Admin',
            role: 'admin',
        });

        console.log(`Administrator ${email} has been created!`);
        process.exit(0);
    } catch (err) {
        console.error('Error creating admin:', err.message);
        process.exit(1);
    }
};

createAdmin();