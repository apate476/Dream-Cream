const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");

const usersRouter = require("./users");
const iceCreamRouter = require("./ice_cream");
const ordersRouter = require("./orders");
const cartRouter = require('./cart');

apiRouter.use("/users", usersRouter);
apiRouter.use("/ice_cream", iceCreamRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use('/cart', cartRouter);

apiRouter.use(async (req, res, next) => {
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith("Bearer ")) {
    // Extract
    const token = auth.slice(7);

    try {
      // Verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with 'Bearer'`,
    });
  }
});

apiRouter.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

module.exports = apiRouter;
