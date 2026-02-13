const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Define schemas inline for seeding
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Create users
    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'Admin'
      },
      {
        name: 'John Resident',
        email: 'resident@example.com',
        password: hashedPassword,
        role: 'Resident'
      },
      {
        name: 'Jane Resident',
        email: 'resident2@example.com',
        password: hashedPassword,
        role: 'Resident'
      },
      {
        name: 'Mike Staff',
        email: 'staff@example.com',
        password: hashedPassword,
        role: 'Staff'
      },
      {
        name: 'Sarah Staff',
        email: 'staff2@example.com',
        password: hashedPassword,
        role: 'Staff'
      }
    ];

    await User.insertMany(users);
    console.log('✅ Users created successfully');
    console.log('\n📋 Login Credentials (password for all: password123):');
    console.log('Admin: admin@example.com');
    console.log('Resident: resident@example.com');
    console.log('Staff: staff@example.com');
    console.log('\n✨ Database seeded successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
