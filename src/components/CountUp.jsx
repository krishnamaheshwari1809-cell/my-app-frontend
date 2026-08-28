import { useEffect, useRef, useState } from 'react';

function CountUp({ value }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const match = String(value).match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    let current = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplay(target + suffix);
        clearInterval(interval);
      } else {
        setDisplay(Math.floor(current) + suffix);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [started, value]);

  return <span ref={ref}>{display}</span>;
}

export default CountUp;