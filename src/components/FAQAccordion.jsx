import { useState } from 'react';
import './FAQAccordion.css';

function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
          <button className="faq-question" onClick={() => toggle(i)}>
            <span>{item.q}</span>
            <span className="faq-icon">{openIndex === i ? '−' : '+'}</span>
          </button>
          <div className="faq-answer-wrap">
            <p className="faq-answer">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FAQAccordion;