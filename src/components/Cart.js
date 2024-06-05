import React from 'react';
import backgroundImage from '../Assets/cart_bg.jpg'; // Import the background image

const Cart = ({ cartItems, incrementQuantity, decrementQuantity, removeItem, placeOrder }) => {
  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div style={{ 
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      minHeight: '100vh' }}>
      <div className="container">
        <h1 className="mb-4 pt-5">Cart</h1>
        <ul className="list-group mb-4">
          {cartItems.map(item => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
              <div>
                {item.name} - ${item.price.toFixed(2)} x {item.quantity}
              </div>
              <div className='cart-btn'>
                <button className="btn btn-secondary btn-sm mr-2" onClick={() => incrementQuantity(item.id)}>+</button>
                <span className='itemquantity'>{item.quantity}</span>
                <button className="btn btn-secondary btn-sm mr-2" onClick={() => decrementQuantity(item.id)}>-</button>
                <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
        <h2>Total: ${totalCost.toFixed(2)}</h2>
        <button className="btn btn-success" onClick={placeOrder}>Order</button>
      </div>
    </div>
  );
};

export default Cart;
