import express, { json } from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import isAuth from "../middlewares/isAuth.js";
import { CoffeeModel } from "../model/coffee.model.js";
import { UserModel } from "../model/user.model.js";

const coffeeRouter = express.Router();

coffeeRouter.post(
  "/new-coffee",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const loggedUser = req.currentUser;

      const coffee = await CoffeeModel.create({
        ...req.body,
        owner: loggedUser._id,
      });

      await UserModel.findOneAndUpdate(
        { _id: loggedUser._id },
        { $push: { coffees: coffee._id } }
      );

      return res.status(201).json(coffee);
    } catch (erro) {
      console.log(erro);
      return res.status(500).json(erro);
    }
  }
);

coffeeRouter.get("/all", async (req, res) => {
  try {
    const coffees = await CoffeeModel.find();

    return res.status(200).json(coffees);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

coffeeRouter.get("/:id", async (req, res) => {
  try {
    console.log(req.params);
    const coffee = await CoffeeModel.findOne({ _id: req.params.id });

    return res.status(200).json(coffee);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

coffeeRouter.patch("/edit/:id", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const loggedUser = req.currentUser;
    const coffee = await CoffeeModel.findOne({ _id: req.params.id });
    if (String(coffee.owner) !== String(loggedUser._id)) {
      return res.status(500).json({ msg: "you can't edit this" });
    }
    const editedCoffee = await CoffeeModel.findOneAndUpdate(
      { _id: coffee._id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(editedCoffee);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json(erro);
  }
});
export { coffeeRouter };
