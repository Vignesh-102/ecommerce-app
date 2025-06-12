import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root')!;

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter basename='/ecommerce-app'>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
