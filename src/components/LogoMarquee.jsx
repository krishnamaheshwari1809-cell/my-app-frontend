import './LogoMarquee.css';

function LogoMarquee({ items }) {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-badge">{item}</span>
        ))}
      </div>
    </div>
  );
}

export default LogoMarquee;