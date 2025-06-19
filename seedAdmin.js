require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require("./backend/models/user"); 

async function seedAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);

  const existingAdmin = await User.findOne({ email: 'admin@control.com' });
  if (existingAdmin) {
    console.log('Admin already exists.');
    return process.exit();
  }

  
  const adminUser = new User({
    name: 'Admin',
    email: 'admin@control.com',
    password: "admin123",
    role: 'admin'
  });

  await adminUser.save();
  console.log('Admin user created');
  process.exit();
}

seedAdmin().catch(err => {
  console.error(' Failed to seed admin:', err);
  process.exit(1);
});