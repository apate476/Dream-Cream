const express = require('express');
const ordersRouter = express.Router();
const { createOrder, addProductsToOrder, getOrdersByUserId } = require('../db/orders');

// -Route to create a new order-
router.post('/create-order', async (req, res, next) => {
  try {
    const { userId, totalPrice, status } = req.body;
    const order = await createOrder(userId, totalPrice, status);
    res.status(201).json({ success: true, order });
  } catch (error) {
    next(error);
  }
});

// -Route to add products to an order-
router.post('/add-products', async (req, res, next) => {
  try {
    const { orderId, icecreamId, quantity } = req.body;
    await addProductsToOrder(orderId, icecreamId, quantity);
    res.json({ success: true, message: 'Products added to order successfully' });
  } catch (error) {
    next(error);
  }
});

// -Route to get orders by user ID-
router.get('/user-orders/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const orders = await getOrdersByUserId(userId);
    res.json({ success: true, orders });
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
