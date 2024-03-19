const express = require("express");
const icRouter = express.Router();
const {
  getAllIceCream,
  //   getIceCreamByName,
  getSinlgeIceCream,
} = require("../db/index");

icRouter.get("/", async (req, res, next) => {
  try {
    const iceCream = await getAllIceCream();
    res.send(iceCream);
  } catch (err) {
    console.log(err);
    next(err);
  }
});


icRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleFlavor = await getSinlgeIceCream(id);
    res.send(singleFlavor);
  } catch (err) {
    console.log(err);
    next(err);
  }
});



// icRouter.get("/:name", async (req, res, next) => {
//   try {
//     const { name } = req.params;
//     const singleFlavor = await getIceCreamByName(name);
//     res.send(singleFlavor);
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// });

module.exports = icRouter;
