const express = require("express");
const cartRouter = express.Router();
const db = require("../db");
const {
  addToCart,
  removeFromCart,
  getCartItemsByUserId,
} = require("../db/cart");

// -Middleware to extract userId and icecreamId from route parameters and add them to req.user-
cartRouter.use("/:userId/:icecreamId", (req, res, next) => {
  const { userId, icecreamId } = req.params;
  req.user = { userId, icecreamId };
  next();
});

// -Route to add an item to the cart-
cartRouter.post("/add-to-cart", async (req, res, next) => {
  try {
    const { userId, icecreamId } = req.params;
    await addToCart(userId, icecreamId);
    res
      .status(201)
      .json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    next(error);
  }
});

// -Route to remove an item from the cart-
cartRouter.delete("/remove-from-cart", async (req, res, next) => {
  try {
    const { userId, icecreamId } = req.params;
    await removeFromCart(userId, icecreamId);
    res.json({ success: true, message: "Item removed from cart successfully" });
  } catch (error) {
    next(error);
  }
});

// -Route to get all items in the cart for a specific user-
cartRouter.get("/user-cart/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cartItems = await getCartItemsByUserId(userId);
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
});

module.exports = cartRouter;
