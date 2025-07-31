// scripts/createUsers.js
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const createUsers = async () => {
  await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: await bcrypt.hash('admin123', 10),
    role: 'Admin'
  });

  await User.create({
    name: 'Manager User',
    email: 'manager@example.com',
    password: await bcrypt.hash('manager123', 10),
    role: 'Manager'
  });

  await User.create({
    name: 'Facilitator User',
    email: 'facilitator@example.com',
    password: await bcrypt.hash('facilitator123', 10),
    role: 'Facilitator'
  });

  console.log('Users created!');
};

createUsers();
