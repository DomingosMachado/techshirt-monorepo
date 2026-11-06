import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './Global.css';

import { ThemeProvider } from './contexts/themeContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { ProductProvider } from './contexts/ProductContext.jsx';
import { AuthProvider } from './contexts/authContext.jsx';
import { FontSizeProvider } from './contexts/FontSizeContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FontSizeProvider>
      <ThemeProvider>
        <AuthProvider>
            <CartProvider>
              <ProductProvider>
                <App />
              </ProductProvider>
            </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </FontSizeProvider>
  </React.StrictMode>
);