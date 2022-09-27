import { Schema, model } from "mongoose";

const coffeeSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  variedade: { type: String, required: true },
  metodoDeSecagem: {
    type: String,
    enum: ["Natural", "Natural descascado", "Honey"],
    default: "Natural",
  },
  fermentado: { type: Boolean, default: false },
  altitude: { type: Number },
  nivelDeTorra: {
    type: String,
    enum: ["Clara", "Media clara", "Media", "Media escura", "Escura"],
    default: "Media",
  },
  pontosSCA: { type: Number },
  notasDeSabor: { type: String },
  metodosDePrep: { type: String },
  harmonização: { type: String },
  userLikeThis: [{ type: Schema.Types.ObjectId, ref: "User" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

export const CoffeeModel = model("Coffee", coffeeSchema);
