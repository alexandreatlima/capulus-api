import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
  },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["ADMIN", "USER", "MOD"], default: "USER" },
  createdAt: { type: Date, default: Date.now() },
  timeWithSpecialtyCoffee: { type: String, default: "Não informado" },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  coffees: [{ type: Schema.Types.ObjectId, ref: "Coffee" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  favCoffees: [{ type: Schema.Types.ObjectId, ref: "Coffee" }],
  avatar: {
    type: String,
    default: "https://www.promoview.com.br/uploads/images/unnamed%2819%29.png",
  },
  favComments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  favReviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

export const UserModel = model("User", userSchema);
