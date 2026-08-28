import { useState } from 'react';
import './TestimonialSlider.css';

function TestimonialSlider({ testimonials }) {
  const [index, setIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  const t = testimonials[index];

  return (
    <div className="testimonial-slider">
      <div className="testimonial-slide">
        <p className="testimonial-quote-mark">"</p>
        <p className="testimonial-text">{t.text}</p>
        <p className="testimonial-name">{t.name}</p>
        <p className="testimonial-role">{t.role}</p>
      </div>

      <div className="testimonial-controls">
        <button className="testimonial-btn" onClick={prev} aria-label="Previous">‹</button>
        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <span key={i} className={`testimonial-dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)}></span>
          ))}
        </div>
        <button className="testimonial-btn" onClick={next} aria-label="Next">›</button>
      </div>
    </div>
  );
}

export default TestimonialSlider;