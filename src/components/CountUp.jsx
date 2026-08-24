import { useEffect, useRef, useState } from 'react';

function CountUp({ value, duration = 1500 }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const match = String(value).match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(match[1]);
    const suffix = match[2] || '';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            setDisplay(current + suffix);
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setDisplay(target + suffix);
            }
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}

export default CountUp;