function ValuesWheel({ values, title, subtitle, eyebrow }) {
  const radius = 250;
  const center = 300;
  const n = values.length;
  const ROTATE_DURATION = 14;

  const points = values.map((v, i) => {
    const angle = (i * (360 / n)) - 90;
    const rad = (angle * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  });

  return (
    <div className="values-wheel-wrap">
      <div className="values-wheel desktop-only">
        <svg className="wheel-svg" viewBox="0 0 600 600">
          <defs>
            {values.map((v) => (
              <marker
                key={v.num}
                id={`arrow-${v.num}`}
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="#60a5fa" />
              </marker>
            ))}
          </defs>
          {points.map((p, i) => {
            const next = points[(i + 1) % n];
            const midAngle = ((i + 0.5) * (360 / n)) - 90;
            const midRad = (midAngle * Math.PI) / 180;
            const bulge = radius * 1.12;
            const cx = center + bulge * Math.cos(midRad);
            const cy = center + bulge * Math.sin(midRad);
            return (
              <path
                key={i}
                d={`M ${p.x} ${p.y} Q ${cx} ${cy} ${next.x} ${next.y}`}
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2.5"
                markerEnd={`url(#arrow-${values[(i + 1) % n].num})`}
              />
            );
          })}
        </svg>

        <div className="wheel-center">
          <p className="eyebrow">{eyebrow}</p>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: '10px', color: '#f8fafc' }}>{title}</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{subtitle}</p>
        </div>

        {values.map((v, i) => {
          const revealDelay = (i / n) * ROTATE_DURATION;
          return (
            <div
              key={v.num}
              className="wheel-node"
              style={{
                left: `${points[i].x}px`,
                top: `${points[i].y}px`,
                animationDelay: `${revealDelay}s, ${revealDelay}s`,
                borderColor: v.color,
              }}
            >
              <span className="wheel-num" style={{ background: v.color }}>{v.num}</span>
              <h3 style={{ fontSize: '0.82rem', margin: '6px 0 4px', lineHeight: 1.25 }}>{v.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.68rem', lineHeight: 1.35 }}>{v.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mobile-only">
        <p className="eyebrow" style={{ textAlign: 'center' }}>{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
        <div className="values-grid">
          {values.map((v) => (
            <div key={v.num} className="value-card" style={{ borderTopColor: v.color }}>
              <span className="value-num" style={{ background: v.color }}>{v.num}</span>
              <h3 style={{ margin: '12px 0 8px', fontSize: '1.05rem' }}>{v.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ValuesWheel;