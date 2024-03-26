import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css";

const Checkout = ({ userId, token }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const timeoutIdRef = useRef(null);

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`/api/cart/user-cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Failed to fetch cart items. Please try again later.");
      }
    };

    fetchCartItems();
  }, [userId, token]);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const handleCheckout = async () => {
    try {
      await axios.patch(
        `/api/cart/clear-cart`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrderPlaced(true);

      timeoutIdRef.current = setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error during checkout:", error);
      setError(
        "Failed to complete the checkout process. Please try again later."
      );
    }
  };

  useEffect(() => {
    return () => {
      setOrderPlaced(false);
      clearTimeout(timeoutIdRef.current);
    };
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cartItems.length > 0 ? (
        <>
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imageurl} alt={item.flavor} />
                <p>Flavor: {item.flavor}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="total-price">Total Price: ${totalPrice}</div>
          <button onClick={handleCheckout}>Purchase</button>
          {orderPlaced && <p>Order Successfully Placed!</p>}
        </>
      ) : (
        <p>Your cart is empty. Please add items to proceed with checkout.</p>
      )}
    </div>
  );
};

export default Checkout;
