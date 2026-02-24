import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // Check Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'يرجى تسجيل الدخول أولاً',
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'sarhan-secret-key-change-in-production';
    const decoded = jwt.verify(token, secret);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'المستخدم غير موجود',
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'جلسة غير صالحة. يرجى تسجيل الدخول مرة أخرى',
    });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'غير مصرح لك بالوصول',
    });
  }
};
