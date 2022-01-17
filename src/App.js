import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductList from './Dashboard/ProductList';
import Login from './Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Login />} />
        <Route path={'/product-list'} element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
