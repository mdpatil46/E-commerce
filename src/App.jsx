import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Cards from './pages/Cards/Cards';
import ProductDetail from './pages/productDeatils/ProductDetail';
import Navbar from './component/Navbar';

function App() {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  return (
    <BrowserRouter>
    {/* {isAuthenticated && <Navbar />}  */}
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cards" element={<Cards />} />
      <Route path='/product/:id' element={<ProductDetail />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;

