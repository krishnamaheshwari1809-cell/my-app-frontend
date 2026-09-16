import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { SeoProvider } from './context/SeoContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SeoProvider>
        <App />
      </SeoProvider>
    </BrowserRouter>
  </StrictMode>,
);