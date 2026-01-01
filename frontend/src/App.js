import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Home from './pages/Home';
import ProductList from './pages/product/ProductList';
import ProductDetail from './pages/product/ProductDetail';
import ProductForm from './pages/product/ProductForm';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import MyPage from './pages/user/MyPage';
import ChatList from './pages/chat/ChatList';
import ChatRoom from './pages/chat/ChatRoom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/chat" element={<ChatList />} />
            <Route path="/chat/:roomId" element={<ChatRoom />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

