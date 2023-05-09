import './App.scss';
import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';

import ManageProducts from './components/ManageProducts';
import SellerOrders from './components/SellerOrders';
import AllProducts from './components/AllProducts';
import { ProductsDispatchContext } from './components/providers/ProductsProvider';

function App() {
  const productsDispatch = useContext(ProductsDispatchContext);

  useEffect(() => {
    const localStorageProducts = JSON.parse(localStorage.getItem('products'));

    fetch("http://ecommerce-app036.wl.r.appspot.com/api/products/", {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        response.json().then((result) => {
          if (localStorageProducts === null || localStorageProducts.length !== result.length) {
            productsDispatch({
              type: 'SET_PRODUCTS',
              payload: {
                products: result
              }
            });
            localStorage.setItem('products', JSON.stringify(result));
          }
        });
      }
    });
  }, []);

  return (
    <div className="App custom-bg">
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="seller/product" element={<ManageProducts />} />
        <Route path="seller/orders" element={<SellerOrders />} />
        <Route path="products" element={<AllProducts />} />
      </Routes>
    </div>
  );
}

export default App;
