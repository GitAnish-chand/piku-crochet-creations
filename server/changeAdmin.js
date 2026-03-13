const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const updateAdmin = async (email, password) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crochet');
        console.log('Connected to Database');

        const hashedPassword = await bcrypt.hash(password, 10);

        let admin = await Admin.findOne();
        if (admin) {
            admin.email = email;
            admin.password = hashedPassword;
            await admin.save();
            console.log(`Admin updated successfully. New Email: ${email}`);
        } else {
            admin = new Admin({ email, password: hashedPassword });
            await admin.save();
            console.log(`Admin created successfully. Email: ${email}`);
        }

        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
    console.log("Usage: node changeAdmin.js <email> <password>");
    process.exit(1);
}

updateAdmin(email, password);
