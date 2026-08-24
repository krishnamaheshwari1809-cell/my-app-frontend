import { useState, useEffect } from 'react';

function TestimonialSlider({ testimonials }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

  const goTo = (i) => setIndex(i);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <div className="ts-wrap">
      <div className="ts-card">
        <p className="ts-quote">"</p>
        <p className="ts-text">{testimonials[index].text}</p>
        <p className="ts-name">{testimonials[index].name}</p>
        <p className="ts-role">{testimonials[index].role}</p>
      </div>

      <div className="ts-controls">
        <button className="ts-arrow" onClick={prev} aria-label="Previous">‹</button>
        <div className="ts-dots">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`ts-dot ${i === index ? 'active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button className="ts-arrow" onClick={next} aria-label="Next">›</button>
      </div>
    </div>
  );
}

export default TestimonialSlider;