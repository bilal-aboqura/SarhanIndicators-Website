import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Generate JWT Token
function generateToken(id) {
  const secret = process.env.JWT_SECRET || 'sarhan-secret-key-change-in-production';
  const expiresIn = process.env.JWT_EXPIRES_IN || '30d';
  return jwt.sign({ id }, secret, { expiresIn });
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني مسجل بالفعل',
      });
    }

    // Create user
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في التسجيل',
    });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال البريد الإلكتروني وكلمة المرور',
      });
    }

    // Find user with password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة',
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة',
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tradingViewUsername: user.tradingViewUsername,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تسجيل الدخول',
    });
  }
});

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      tradingViewUsername: req.user.tradingViewUsername,
    },
  });
});

// PUT /api/auth/profile — Update user profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, email, tradingViewUsername, currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');

    if (name) user.name = name;
    if (email) user.email = email;
    if (tradingViewUsername !== undefined) user.tradingViewUsername = tradingViewUsername;

    // Change password if provided
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'يرجى إدخال كلمة المرور الحالية',
        });
      }

      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'كلمة المرور الحالية غير صحيحة',
        });
      }

      user.password = newPassword;
    }

    await user.save();

    res.json({
      success: true,
      message: 'تم تحديث البيانات بنجاح',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tradingViewUsername: user.tradingViewUsername,
      },
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث البيانات',
    });
  }
});

// GET /api/auth/subscriptions — Get user's subscriptions
router.get('/subscriptions', protect, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.user._id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      subscriptions,
    });
  } catch (error) {
    console.error('Subscriptions fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الاشتراكات',
    });
  }
});

// POST /api/auth/tradingview-username
router.post('/tradingview-username', protect, async (req, res) => {
  try {
    const { tradingViewUsername } = req.body;

    if (!tradingViewUsername) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال اسم مستخدم TradingView',
      });
    }

    req.user.tradingViewUsername = tradingViewUsername;
    await req.user.save();

    res.json({
      success: true,
      message: 'تم حفظ اسم مستخدم TradingView بنجاح',
    });
  } catch (error) {
    console.error('TradingView username error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في حفظ البيانات',
    });
  }
});

export default router;
