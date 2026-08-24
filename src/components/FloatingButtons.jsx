import { useEffect, useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';

function FloatingButtons() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch('https://my-app-backend-bh6j.onrender.com/api/content')
      .then((res) => res.json())
      .then(setContent)
      .catch(() => {});
  }, []);

  const phone = content?.contact?.phone || '';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  if (!phone) {
    return null;
  }

  return (
    <div className="floating-buttons-wrap">
      <a href={'https://wa.me/' + cleanPhone} target="_blank" rel="noopener noreferrer" className="fab fab-whatsapp" aria-label="WhatsApp">
        <MessageCircle color="#fff" size={26} />
      </a>
      <a href={'tel:' + phone} className="fab fab-call" aria-label="Call">
        <Phone color="#fff" size={24} />
      </a>
    </div>
  );
}

export default FloatingButtons;