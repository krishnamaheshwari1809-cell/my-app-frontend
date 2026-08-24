import { useState } from 'react';

function FAQItem({ q, a, isOpen, onClick }) {
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={onClick}>
        <span>{q}</span>
        <span className={`faq-icon ${isOpen ? 'open' : ''}`}>+</span>
      </button>
      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
        <p>{a}</p>
      </div>
    </div>
  );
}

function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <FAQItem
          key={i}
          q={item.q}
          a={item.a}
          isOpen={openIndex === i}
          onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  );
}

export default FAQAccordion;