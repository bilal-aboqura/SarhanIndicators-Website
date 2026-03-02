import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']); // Google DNS fallback
} catch (e) {
  console.error('Failed to set custom DNS servers:', e);
}

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';

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
    // Allow requests with no origin (browsers loading same-origin assets, curl, Postman)
    if (!origin) return callback(null, true);
    // Allow any localhost
    if (origin.match(/^https?:\/\/localhost(:\d+)?$/)) return callback(null, true);
    // Allow direct IP access (e.g. http://148.230.112.105:5000)
    if (origin.match(/^https?:\/\/\d+\.\d+\.\d+\.\d+(:\d+)?$/)) return callback(null, true);
    // Allow the configured domain (both http and https)
    const frontendUrl = process.env.FRONTEND_URL || '';
    const domain = frontendUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
    if (domain && origin.replace(/^https?:\/\//, '').replace(/\/$/, '') === domain) {
      return callback(null, true);
    }
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
  // Then serve the built frontend (dist folder)
  app.use(express.static(distPath));

  // Handle MPA routing: ONLY intercept requests with no file extension
  // This prevents returning HTML for CSS/JS/image asset requests
  app.get('*', (req, res) => {
    const ext = extname(req.path);
    // If request has a file extension (e.g. .css, .js, .png), it's an asset — skip
    if (ext) return res.status(404).send('Not found');

    if (!req.path.startsWith('/api')) {
      // Map /login -> login.html, / -> index.html
      const pageName = req.path === '/' ? 'index.html' : `${req.path.slice(1)}.html`;
      const filePath = join(distPath, pageName);

      res.sendFile(filePath, (err) => {
        if (err) {
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
