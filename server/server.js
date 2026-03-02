import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']); // Google DNS fallback
} catch (e) {
  console.error('Failed to set custom DNS servers:', e);
}

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const result = dotenv.config({ path: join(__dirname, '.env') });
if (result.error) {
  console.error('❌ Failed to load .env file:', result.error);
} else {
  console.log('✅ .env file loaded successfully');
  console.log('🔑 Kashier configured:', !!process.env.KASHIER_API_KEY);
}

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

// Route imports
import authRoutes from './routes/auth.js';
import paymentRoutes from './routes/payment.js';
import adminRoutes from './routes/admin.js';
import pricingRoutes from './routes/pricing.js';
import testimonialRoutes from './routes/testimonial.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Global Security & Optimization
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(compression());

// Global Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { success: false, message: 'الكثير من الطلبات، يرجى المحاولة لاحقاً' }
});
app.use('/api/', limiter);

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman, etc)
    if (!origin) return callback(null, true);
    // Allow any localhost port in development
    if (origin.match(/^https?:\/\/localhost(:\d+)?$/)) return callback(null, true);
    // Build list of allowed origins from env (accepts http and https of the same domain)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const baseUrl = process.env.BASE_URL || '';
    const allowedOrigins = [
      frontendUrl,
      baseUrl,
      // also accept the other protocol variant (http <-> https)
      frontendUrl.replace('https://', 'http://'),
      frontendUrl.replace('http://', 'https://'),
      baseUrl.replace('https://', 'http://'),
      baseUrl.replace('http://', 'https://'),
    ].filter(Boolean);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  const distPath = join(__dirname, '../dist');
  const publicPath = join(__dirname, '../public');

  // Serve the public folder (contains /assets/images, etc.) first
  app.use(express.static(publicPath));
  // Then serve the built frontend
  app.use(express.static(distPath));

  // Handle MPA routing: /login -> login.html, etc.
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      const possibleFile = req.path === '/' ? 'index.html' : `${req.path.slice(1)}.html`;
      const filePath = join(distPath, possibleFile);

      res.sendFile(filePath, (err) => {
        if (err) {
          // Fallback to index.html for any unknown route
          res.sendFile(join(distPath, 'index.html'));
        }
      });
    }
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});
