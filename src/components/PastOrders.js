import React from 'react';
import backgroundImage from '../Assets/pastorder_bg.jpg'; // Import the background image

const PastOrders = ({ pastOrders, removeOrder }) => {
  return (
    <div 
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        minHeight: '100vh' 
      }}
    >
      <div className="container">
        <h1 className="mb-4 pt-5">Past Orders</h1>
        {pastOrders.length === 0 ? (
          <p>No past orders found.</p>
        ) : (
          <ul className="list-group">
            {pastOrders.map(order => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={order.id}>
                Order #{order.id} - ${order.total.toFixed(2)}
                <button className="btn btn-danger btn-sm" onClick={() => removeOrder(order.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PastOrders;
