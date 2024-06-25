import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style.css";
import "./cart.css";

const Cart = ({ token, userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`/api/cart/user-cart`, {
        headers: { Authorization: `Bearer ${token}` },
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
      await axios.patch(
        `/api/cart/remove-from-cart`,
        { userId, icecreamId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCartItems();
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setError("Failed to remove item from cart. Please try again later.");
    }
  };

  return (
    <div className="ShoppingCart-container">
      <h4>Shopping Cart</h4>
      {error && <div className="error">{error}</div>}
      <div className="cart-items-container">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageurl} />
              <p>Flavor: {item.flavor}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="empty-cart">
            Your cart is empty. Please add items to proceed with checkout.
          </p>
        )}
      </div>
      <div className="total-price">Total Price: ${totalPrice}</div>
      <Link to="/Checkout">
        <button className="checkout-button">Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
