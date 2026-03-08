import"./components-r4Svx-eW.js";import"./i18n-R53-v9P5.js";import"./main-kBTmvTl9.js";async function e(){const s=document.getElementById("testimonialsTrack");if(s)try{const t=await(await fetch("/api/testimonials")).json();t.success&&t.testimonials.length>0?s.innerHTML=t.testimonials.map(a=>`
        <div class="testimonial-card glass-card">
          <div class="stars">${"★".repeat(a.rating)}${"☆".repeat(5-a.rating)}</div>
          <p class="quote">${a.comment}</p>
          <div class="author">${a.name}</div>
        </div>
      `).join(""):s.innerHTML=`
        <div class="testimonial-card glass-card">
          <div class="stars">★★★★★</div>
          <p class="quote">كن أول من يشارك تجربته مع مؤشرات Sarhan!</p>
          <div class="author">فريق العمل</div>
        </div>
      `}catch(i){console.error("Failed to load testimonials:",i),s.innerHTML='<p style="color:red">فشل تحميل الآراء</p>'}}document.addEventListener("DOMContentLoaded",e);
