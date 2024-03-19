import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Checkout = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`/api/cart/${userId}`);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`/api/cart/${userId}/${itemId}`);
      setCartItems(cartItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('/api/orders/checkout', {
        userId,
        items: cartItems,
      });
      console.log(response.data.message);
      
      setCartItems([]);
    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        {cartItems.map((item) => (
          <div key={item.id}>
            <p>{item.flavor}</p>
            <p>Price: ${item.price}</p>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <p>Total: ${calculateTotal()}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Checkout;


