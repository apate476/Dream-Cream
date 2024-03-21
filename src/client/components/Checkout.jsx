
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { clearCart } from '../db/cart';
// import { createOrder, addProductsToOrder } from '../db/orders';

const Checkout = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // -Function to fetch cart items from the server-
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`/api/cart/user-cart/${userId}`);
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  // -Function to calculate total price-
  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  // -Effect to recalculate total price when cart items change-
  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  // -Function to handle checkout process-
  const handleCheckout = async () => {
    try {
      // -Create a new order-
      const order = await createOrder(userId, totalPrice, 'Pending');

      // -Add each product in the cart to the order-
      await Promise.all(
        cartItems.map(async (item) => {
          await addProductsToOrder(order.id, item.id, item.quantity);
        })
      );

      // -Clear the cart-
      await clearCart(userId);

      // -Redirect back to Cart.jsx-
      navigate('/Cart');
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <span>{item.flavor}</span>
            <span>{item.price}</span>
            <span>Quantity: {item.quantity}</span>
          </li>
        ))}
      </ul>
      <div>Total Price: ${totalPrice}</div>
      <button onClick={handleCheckout}>Purchase</button>
    </div>
  );
};

export default Checkout;
