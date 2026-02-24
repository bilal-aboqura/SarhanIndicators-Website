import express from 'express';
import Pricing from '../models/Pricing.js';
import Settings from '../models/Settings.js';
import { protect, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/pricing/rate
 * @desc    Get current USD to EGP rate
 * @access  Public
 */
router.get('/rate', async (req, res) => {
  try {
    const rateDoc = await Settings.findOne({ key: 'usdToEgpRate' });
    res.json({ rate: rateDoc ? rateDoc.value : 50 });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST /api/pricing/rate
 * @desc    Update USD to EGP rate
 * @access  Private/Admin
 */
router.post('/rate', protect, requireAdmin, async (req, res) => {
  const { rate } = req.body;
  try {
    await Settings.findOneAndUpdate(
      { key: 'usdToEgpRate' },
      { value: rate },
      { upsert: true, new: true }
    );

    // Bulk update all EGP prices based on the new rate
    const usdPrices = await Pricing.find({ currency: 'USD' });
    for (const usd of usdPrices) {
      await Pricing.findOneAndUpdate(
        { planId: usd.planId, billingCycle: usd.billingCycle, currency: 'EGP' },
        { 
          amount: Math.round(usd.amount * rate),
          originalAmount: Math.round((usd.originalAmount || 0) * rate),
          discountPercentage: usd.discountPercentage,
          isActive: usd.isActive
        }
      );
    }

    res.json({ success: true, rate });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST /api/pricing/seed
 * @desc    Seed initial pricing data (Admin only, use with caution)
 * @access  Private/Admin
 */
router.post('/seed', protect, requireAdmin, async (req, res) => {
    try {
        const count = await Pricing.countDocuments();
        if (count > 0 && !req.query.force) {
            return res.status(400).json({ msg: 'Pricing data already exists. Use ?force=true to overwrite.' });
        }

        if (req.query.force) {
            await Pricing.deleteMany({});
        }

        const initialPrices = [
            // X-Trend Pro
            { planId: 'x-trend-pro', billingCycle: 'monthly', currency: 'USD', amount: 40, originalAmount: 50, discountPercentage: 20 },
            { planId: 'x-trend-pro', billingCycle: 'yearly', currency: 'USD', amount: 80, originalAmount: 100, discountPercentage: 20 },
            { planId: 'x-trend-pro', billingCycle: 'monthly', currency: 'EGP', amount: 2000, originalAmount: 2500, discountPercentage: 20 },
            { planId: 'x-trend-pro', billingCycle: 'yearly', currency: 'EGP', amount: 4000, originalAmount: 5000, discountPercentage: 20 },

            // Smart Map
            { planId: 'smart-map', billingCycle: 'monthly', currency: 'USD', amount: 40, originalAmount: 50, discountPercentage: 20 },
            { planId: 'smart-map', billingCycle: 'yearly', currency: 'USD', amount: 80, originalAmount: 100, discountPercentage: 20 },
            { planId: 'smart-map', billingCycle: 'monthly', currency: 'EGP', amount: 2000, originalAmount: 2500, discountPercentage: 20 },
            { planId: 'smart-map', billingCycle: 'yearly', currency: 'EGP', amount: 4000, originalAmount: 5000, discountPercentage: 20 },

            // Both
            { planId: 'both', billingCycle: 'monthly', currency: 'USD', amount: 70, originalAmount: 90, discountPercentage: 22 },
            { planId: 'both', billingCycle: 'yearly', currency: 'USD', amount: 120, originalAmount: 150, discountPercentage: 20 },
            { planId: 'both', billingCycle: 'monthly', currency: 'EGP', amount: 3500, originalAmount: 4500, discountPercentage: 22 },
            { planId: 'both', billingCycle: 'yearly', currency: 'EGP', amount: 6000, originalAmount: 7500, discountPercentage: 20 },
        ];

        await Pricing.insertMany(initialPrices);
        res.json({ msg: 'Pricing data seeded successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/**
 * @route   GET /api/pricing
 * @desc    Get all pricing configurations
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const pricing = await Pricing.find({});
    const rateDoc = await Settings.findOne({ key: 'usdToEgpRate' });
    const rate = rateDoc ? rateDoc.value : 50;
    res.json({ pricing, exchangeRate: rate });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   PUT /api/pricing/:id
 * @desc    Update a pricing configuration
 * @access  Private/Admin
 */
router.put('/:id', protect, requireAdmin, async (req, res) => {
  const { amount, originalAmount, discountPercentage, isActive } = req.body;

  try {
    let pricing = await Pricing.findById(req.params.id);

    if (!pricing) {
      return res.status(404).json({ msg: 'Pricing configuration not found' });
    }

    pricing.amount = amount ?? pricing.amount;
    pricing.originalAmount = originalAmount ?? pricing.originalAmount;
    pricing.discountPercentage = discountPercentage ?? pricing.discountPercentage;
    if (typeof isActive !== 'undefined') pricing.isActive = isActive;

    await pricing.save();

    // If this is a USD price, update the EGP counterpart
    if (pricing.currency === 'USD') {
      const rateDoc = await Settings.findOne({ key: 'usdToEgpRate' });
      const rate = rateDoc ? rateDoc.value : 50;

      const egpPricing = await Pricing.findOne({
        planId: pricing.planId,
        billingCycle: pricing.billingCycle,
        currency: 'EGP'
      });

      if (egpPricing) {
        egpPricing.amount = Math.round(pricing.amount * rate);
        egpPricing.originalAmount = Math.round((pricing.originalAmount || 0) * rate);
        egpPricing.discountPercentage = pricing.discountPercentage;
        egpPricing.isActive = pricing.isActive;
        await egpPricing.save();
      }
    }

    res.json({ success: true, pricing });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Pricing configuration not found' });
    }
    res.status(500).send('Server Error');
  }
});

export default router;
