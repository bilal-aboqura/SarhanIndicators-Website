import express from 'express';
import Testimonial from '../models/Testimonial.js';

const router = express.Router();

// @desc    Submit a new testimonial
// @route   POST /api/testimonials
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إكمال جميع الحقول المطلوبة'
      });
    }

    const testimonial = await Testimonial.create({
      name,
      rating,
      comment,
      status: 'pending' // Always pending until admin approves
    });

    res.status(201).json({
      success: true,
      message: 'تم إرسال رأيك بنجاح، سيظهر بعد المراجعة. شكراً لك!',
      testimonial
    });
  } catch (error) {
    console.error('Testimonial submission error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء إرسال رأيك'
    });
  }
});

// @desc    Get all approved testimonials
// @route   GET /api/testimonials
// @access  Public
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: 'approved' }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: testimonials.length,
      testimonials
    });
  } catch (error) {
    console.error('Testimonial fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء جلب الآراء'
    });
  }
});

export default router;
