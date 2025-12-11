import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './context/AuthContext';
import './i18n'


const rootElement = document.getElementById('root')!;

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename='/ecommerce-app'>
      <AuthProvider>
        <App />
      </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
