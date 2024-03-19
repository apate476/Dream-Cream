const { createOrder, clearCart } = require('../db/orders');

const orderController = {
  createOrder: async (req, res, next) => {
    try {
      
      const order = await createOrder(req.body);
      res.status(201).json({ success: true, order });
    } catch (error) {
      next(error);
    }
  },

  clearCart: async (req, res, next) => {
    try {
      
      const userId = req.params.userId;
      await clearCart(userId);
      res.json({ success: true, message: 'Cart cleared successfully' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = orderController;
