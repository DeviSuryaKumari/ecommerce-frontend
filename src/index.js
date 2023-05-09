import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './components/providers/UserProvider';
import { ProductsProvider } from './components/providers/ProductsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ProductsProvider>
        <BrowserRouter><App /></BrowserRouter>
      </ProductsProvider>
    </UserProvider>
  </React.StrictMode>
);
