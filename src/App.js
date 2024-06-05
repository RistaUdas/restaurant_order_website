import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import PastOrders from './components/PastOrders';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);

  const addToCart = (item) => {
    setCartItems(prevItems => [...prevItems, { ...item, quantity: 1 }]);
  };

  const incrementQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const placeOrder = () => {
    const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const order = { id: Date.now(), total };
    setPastOrders(prevOrders => [...prevOrders, order]);
    setCartItems([]);

    fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
    .then(response => response.json())
    .catch(error => console.error('Error placing order:', error));
  };

  const removeOrder = (id) => {
    setPastOrders(prevOrders => prevOrders.filter(order => order.id !== id));

    fetch(`http://localhost:5000/orders/${id}`, {
      method: 'DELETE',
    })
    .catch(error => console.error('Error removing order:', error));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} cartItems={cartItems} />} />
        <Route path="/cart" element={
          <Cart
            cartItems={cartItems}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            removeItem={removeItem}
            placeOrder={placeOrder}
          />
        } />
        <Route path="/past-orders" element={
          <PastOrders pastOrders={pastOrders} removeOrder={removeOrder} />
        } />
      </Routes>
    </Router>
  );
};

export default App;
