import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        if (!token) return;
        const response = await axios.get(`/api/cart/user-cart/${userId}`, {
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
      const orderResponse = await axios.post(
        "/api/orders/create-order",
        {
          userId,
          totalPrice,
          status: "Pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const orderId = orderResponse.data.order.id;

      await Promise.all(
        cartItems.map(async (item) => {
          await axios.post(
            "/api/orders/add-products",
            {
              orderId,
              icecreamId: item.id,
              quantity: item.quantity,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        })
      );

      await axios.delete(`/api/cart/clear-cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrderPlaced(true);

      timeoutIdRef.current = setTimeout(() => {
        navigate("/account");
      }, 4000);
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
    <div>
      <h2>Checkout</h2>
      {cartItems.length > 0 ? (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>{item.flavor}</span>
                <span>${item.price}</span>
                <span>{item.quantity}</span>
              </li>
            ))}
          </ul>
          <div>Total Price: ${totalPrice}</div>
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
