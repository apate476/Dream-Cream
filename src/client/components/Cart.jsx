import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = ({ token, userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`/api/cart/user-cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data);
      calculateTotalPrice(response.data);
    } catch (error) {}
  };

  const calculateTotalPrice = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId, token]);

  const handleRemoveFromCart = async (icecreamId) => {
    try {
      if (!token) {
        return;
      }
      await axios.delete(`/api/cart/remove-from-cart/${userId}/${icecreamId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCartItems();
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setError("Failed to remove item from cart. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {error && <div>{error}</div>}
      {cartItems.length > 0 ? (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>{item.flavor}</span>
                <span>${item.price}</span>
                <span>{item.quantity}</span>
                <button onClick={() => handleRemoveFromCart(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div>Total Price: ${totalPrice}</div>
          <Link to="/Checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </>
      ) : (
        <p>Your cart is empty. Please add items to proceed with checkout.</p>
      )}
    </div>
  );
};

export default Cart;
