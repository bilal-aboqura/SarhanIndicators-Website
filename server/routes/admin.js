import express from 'express';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import Testimonial from '../models/Testimonial.js';
import { protect, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require auth + admin role
router.use(protect, requireAdmin);

// GET /api/admin/stats — Dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    const totalSubscriptions = await Subscription.countDocuments();

    // Revenue calculation
    const revenueResult = await Subscription.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // New users this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const newUsersThisMonth = await User.countDocuments({ createdAt: { $gte: startOfMonth } });

    res.json({
      success: true,
      stats: {
        totalUsers,
        activeSubscriptions,
        totalSubscriptions,
        totalRevenue,
        newUsersThisMonth,
      },
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ' });
  }
});

// GET /api/admin/users — List all users with pagination & search
router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { tradingViewUsername: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Admin users list error:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ' });
  }
});

// GET /api/admin/users/:id — Single user with subscriptions
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
    }

    const subscriptions = await Subscription.find({ userId: user._id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      user,
      subscriptions,
    });
  } catch (error) {
    console.error('Admin user detail error:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ' });
  }
});

// PUT /api/admin/users/:id — Update user
router.put('/users/:id', async (req, res) => {
  try {
    const { role, tradingViewUsername, name, email } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
    }

    if (role) user.role = role;
    if (tradingViewUsername !== undefined) user.tradingViewUsername = tradingViewUsername;
    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.json({
      success: true,
      message: 'تم تحديث المستخدم بنجاح',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tradingViewUsername: user.tradingViewUsername,
      },
    });
  } catch (error) {
    console.error('Admin user update error:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ' });
  }
});

// DELETE /api/admin/users/:id — Delete user and their subscriptions
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
    }

    // Don't allow deleting yourself
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'لا يمكنك حذف حسابك' });
    }

    await Subscription.deleteMany({ userId: user._id });
    await User.findByIdAndDelete(user._id);

    res.json({
      success: true,
      message: 'تم حذف المستخدم بنجاح',
    });
  } catch (error) {
    console.error('Admin user delete error:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ' });
  }
});

// GET /api/admin/subscriptions — List all subscriptions with filters
router.get('/subscriptions', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status || '';

    const query = {};
    if (status) {
      query.status = status;
    }

    const total = await Subscription.countDocuments(query);
    const subscriptions = await Subscription.find(query)
      .populate('userId', 'name email tradingViewUsername')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      subscriptions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Admin subscriptions list error:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ' });
  }
});

// PUT /api/admin/subscriptions/:id — Update subscription
router.put('/subscriptions/:id', async (req, res) => {
  try {
    const { status, startDate, endDate } = req.body;

    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ success: false, message: 'الاشتراك غير موجود' });
    }

    if (status) subscription.status = status;
    if (startDate) subscription.startDate = new Date(startDate);
    if (endDate) subscription.endDate = new Date(endDate);

    await subscription.save();

    res.json({
      success: true,
      message: 'تم تحديث الاشتراك بنجاح',
      subscription,
    });
  } catch (error) {
    console.error('Admin subscription update error:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ' });
  }
});

// === Testimonial Moderation ===

// GET /api/admin/testimonials — List all reviews
router.get('/testimonials', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;

    const query = {};
    if (status) query.status = status;

    const total = await Testimonial.countDocuments(query);
    const testimonials = await Testimonial.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      testimonials,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Admin testimonials list error:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ' });
  }
});

// PATCH /api/admin/testimonials/:id — Approve/Reject review
router.patch('/testimonials/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ success: false, message: 'حالة غير صالحة' });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'الرأي غير موجود' });
    }

    res.json({
      success: true,
      message: 'تم تحديث حالة الرأي بنجاح',
      testimonial
    });
  } catch (error) {
    console.error('Admin testimonial update error:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ' });
  }
});

// DELETE /api/admin/testimonials/:id — Delete review
router.delete('/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'الرأي غير موجود' });
    }
    res.json({ success: true, message: 'تم حذف الرأي بنجاح' });
  } catch (error) {
    console.error('Admin testimonial delete error:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ' });
  }
});

export default router;
