import './App.scss';
import { Routes, Route, useParams } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './components/providers/UserProvider';
import ManageProducts from './components/ManageProducts';
import SellerOrders from './components/SellerOrders';
import AllProducts from './components/AllProducts';
import { ProductsProvider } from './components/providers/ProductsProvider';
import ProductDetails from './components/ProductDetails';

function App() {
  const { id } = useParams();

  return (
    <UserProvider>
      <ProductsProvider>
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
            <Route path="products" element={<AllProducts />}>
              <Route path=":id" element={<ProductDetails />} />
            </Route>

          </Routes>
        </div>
      </ProductsProvider>
    </UserProvider>

  );
}

export default App;
