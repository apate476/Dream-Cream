import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../db/cart';

const Cart = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);
  
  // -Function to fetch cart items from the server-
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`/api/cart/user-cart/${userId}`);
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  // -Function to handle item removal from cart-
  const handleRemoveFromCart = async (icecreamId) => {
    try {
      await removeFromCart(userId, icecreamId);
      fetchCartItems(); // -Update cart items after removal-
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <span>{item.flavor}</span>
            <span>Price: ${item.price}</span>
            <span>Quantity: {item.quantity}</span>
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      
      <Link to="/Checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
