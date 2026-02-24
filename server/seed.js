import dns from 'dns';
try { dns.setServers(['8.8.8.8', '8.8.4.4']); } catch (e) {}

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

import mongoose from 'mongoose';
import User from './models/User.js';

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  // Test User
  const existingUser = await User.findOne({ email: 'user@test.com' });
  if (!existingUser) {
    await User.create({ name: 'مستخدم تجريبي', email: 'user@test.com', password: 'test123', role: 'user' });
    console.log('👤 Test user created: user@test.com / test123');
  } else {
    console.log('👤 Test user already exists: user@test.com');
  }

  // Admin User
  const existingAdmin = await User.findOne({ email: 'admin@test.com' });
  if (!existingAdmin) {
    await User.create({ name: 'مدير النظام', email: 'admin@test.com', password: 'admin123', role: 'admin' });
    console.log('🔑 Admin user created: admin@test.com / admin123');
  } else {
    console.log('🔑 Admin user already exists: admin@test.com');
  }

  await mongoose.disconnect();
  console.log('✅ Done');
}

seed().catch(err => { console.error(err); process.exit(1); });
