import express from 'express';
import { protect } from '../middleware/auth.js';
import Subscription from '../models/Subscription.js';
import User from '../models/User.js';
import * as kashierService from '../services/kashierService.js';

const router = express.Router();

// Price map
import Pricing from '../models/Pricing.js';

// POST /api/payment/create
router.post('/create', protect, async (req, res) => {
  try {
    const { planId, billingCycle, currency } = req.body;

    // Validate
    const cur = currency === 'EGP' ? 'EGP' : 'USD';

    // Fetch dynamic pricing
    const pricingConfig = await Pricing.findOne({
      planId,
      billingCycle,
      currency: cur,
      isActive: true,
    });

    if (!pricingConfig) {
      return res.status(404).json({ success: false, message: 'تكوين السعر غير موجود' });
    }

    const amount = pricingConfig.amount;
    console.log('💰 Creating payment for:', { userId: req.user._id, planId, billingCycle, cur, amount });

    if (!kashierService.isConfigured()) {
      console.error('❌ Kashier NOT configured');
      return res.status(400).json({
        success: false,
        message: 'بوابة الدفع غير مُهيئة. تواصل مع الدعم.',
      });
    }

    // Generate unique order ID
    const orderId = `SI-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

    // Cancel previous pending subscriptions for this user to keep data clean
    await Subscription.updateMany(
      { userId: req.user._id, status: 'pending' },
      { status: 'cancelled' }
    );

    // Create pending subscription
    const subscription = await Subscription.create({
      userId: req.user._id,
      planId,
      billingCycle,
      currency: cur,
      amount,
      status: 'pending',
      kashierOrderId: orderId,
    });

    console.log('📝 Pending subscription created:', subscription._id);

    // Generate payment URL
    const paymentUrl = kashierService.createPaymentUrl({
      orderId,
      amount,
      currency: cur,
      userId: req.user._id.toString(),
      planId,
      billingCycle,
      email: req.user.email,
    });

    console.log('🔗 Payment URL generated:', paymentUrl);

    res.json({
      success: true,
      paymentUrl,
      orderId,
      kashierOrderId: orderId
    });
  } catch (error) {
    console.error('❌ Payment create error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في إنشاء عملية الدفع',
      error: error.message
    });
  }
});

// POST /api/payment/webhook — Kashier webhook
router.post('/webhook', async (req, res) => {
  try {
    console.log('📨 Webhook received:', JSON.stringify(req.body, null, 2));

    const result = kashierService.verifyWebhookSignature(req.body);

    if (!result.verified) {
      console.error('❌ Webhook verification failed:', result.error);
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    const { data } = result;
    const orderId = data.merchantOrderId;
    const status = data.status || data.paymentStatus;

    // Find subscription
    const subscription = await Subscription.findOne({ kashierOrderId: orderId });
    if (!subscription) {
      console.error('❌ Subscription not found for order:', orderId);
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }

    if (status === 'SUCCESS' || status === 'CAPTURED') {
      // Calculate dates
      const now = new Date();
      const endDate = new Date(now);
      if (subscription.billingCycle === 'yearly') {
        endDate.setFullYear(endDate.getFullYear() + 1);
      } else {
        endDate.setMonth(endDate.getMonth() + 1);
      }

      subscription.status = 'active';
      subscription.startDate = now;
      subscription.endDate = endDate;
      subscription.kashierTransactionId = data.transactionId || '';
      await subscription.save();

      console.log(`✅ Subscription activated: ${orderId}`);
    } else {
      subscription.status = 'cancelled';
      await subscription.save();
      console.log(`❌ Payment failed for order: ${orderId}, status: ${status}`);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false });
  }
});

// GET /api/payment/status/:orderId
router.get('/status/:orderId', protect, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      kashierOrderId: req.params.orderId,
      userId: req.user._id,
    });

    if (!subscription) {
      return res.status(404).json({ success: false, message: 'لم يتم العثور على الاشتراك' });
    }

    res.json({
      success: true,
      subscription: {
        planId: subscription.planId,
        status: subscription.status,
        billingCycle: subscription.billingCycle,
        startDate: subscription.startDate,
        endDate: subscription.endDate,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'حدث خطأ' });
  }
});

// POST /api/payment/telegram-id — Save Telegram ID after success
router.post('/telegram-id', protect, async (req, res) => {
  try {
    const { orderId, telegramId } = req.body;
    
    const subscription = await Subscription.findOne({
      kashierOrderId: orderId,
      userId: req.user._id
    });

    if (!subscription) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }

    subscription.telegramId = telegramId;
    await subscription.save();

    res.json({ success: true, message: 'Telegram ID saved' });
  } catch (error) {
    console.error('Save telegramId error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
