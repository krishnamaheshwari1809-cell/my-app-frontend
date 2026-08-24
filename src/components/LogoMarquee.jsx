function LogoMarquee({ items }) {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="marquee-chip">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoMarquee;