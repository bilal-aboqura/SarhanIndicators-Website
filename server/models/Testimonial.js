import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'يرجى إدخال الاسم'],
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'يرجى اختيار التقييم'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: [true, 'يرجى كتابة رأيك'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
