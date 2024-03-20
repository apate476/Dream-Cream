const express = require("express");
const icRouter = express.Router();
const { getAllIceCream, getSinlgeIceCream, addFlavor } = require("../db/index");

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

icRouter.post("/", async (req, res, next) => {
  try {
    const flavor = req.body;
    const newflavor = await addFlavor(flavor);
    newflavor.push(flavor);
    res.send(flavor);
  } catch (error) {
    console.error(error);
  }
});

module.exports = icRouter;
