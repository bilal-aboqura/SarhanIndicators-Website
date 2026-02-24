import mongoose from 'mongoose';

const pricingSchema = new mongoose.Schema({
  planId: {
    type: String,
    required: true,
    enum: ['x-trend-pro', 'smart-map', 'both'],
  },
  billingCycle: {
    type: String,
    required: true,
    enum: ['monthly', 'yearly'],
  },
  currency: {
    type: String,
    required: true,
    enum: ['USD', 'EGP'],
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  originalAmount: {
    type: Number,
    min: 0,
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

// Composite unique index to ensure one price per configuration
pricingSchema.index({ planId: 1, billingCycle: 1, currency: 1 }, { unique: true });

const Pricing = mongoose.model('Pricing', pricingSchema);

export default Pricing;
