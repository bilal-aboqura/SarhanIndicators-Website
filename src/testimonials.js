// Testimonials Loading Logic
async function loadHomeTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  if (!track) return;

  try {
    const res = await fetch('/api/testimonials');
    const data = await res.json();

    if (data.success && data.testimonials.length > 0) {
      track.innerHTML = data.testimonials.map(t => `
        <div class="testimonial-card glass-card">
          <div class="stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
          <p class="quote">${t.comment}</p>
          <div class="author">${t.name}</div>
        </div>
      `).join('');
    } else {
      // Fallback or hide if none
      track.innerHTML = `
        <div class="testimonial-card glass-card">
          <div class="stars">★★★★★</div>
          <p class="quote">كن أول من يشارك تجربته مع مؤشرات Sarhan!</p>
          <div class="author">فريق العمل</div>
        </div>
      `;
    }
  } catch (err) {
    console.error('Failed to load testimonials:', err);
    track.innerHTML = '<p style="color:red">فشل تحميل الآراء</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadHomeTestimonials);
