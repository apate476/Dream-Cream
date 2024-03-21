const express = require('express');
const router = express.Router();
const db = require('../db');
const { addToCart, removeFromCart, getCartItemsByUserId } = require('../db/cart');

// -Route to add an item to the cart-
router.post('/add-to-cart', async (req, res, next) => {
  try {
    const { userId, icecreamId } = req.body;
    await addToCart(userId, icecreamId);
    res.status(201).json({ success: true, message: 'Item added to cart successfully' });
  } catch (error) {
    next(error);
  }
});

// -Route to remove an item from the cart-
router.delete('/remove-from-cart/:userId/:icecreamId', async (req, res, next) => {
  try {
    const { userId, icecreamId } = req.params;
    await removeFromCart(userId, icecreamId);
    res.json({ success: true, message: 'Item removed from cart successfully' });
  } catch (error) {
    next(error);
  }
});

// -Route to get all items in the cart for a specific user-
router.get('/user-cart/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cartItems = await getCartItemsByUserId(userId);
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
});

module.exports = router;


