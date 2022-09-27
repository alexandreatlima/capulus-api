import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  coffee: { type: Schema.Types.ObjectId, ref: "Coffee" },
  title: { type: String, maxLength: 80, required: true },
  body: { type: String, required: true },
  coffeePicture: {
    type: String,
    default:
      "https://blog.cafealfaia.com.br/wp-content/uploads/2021/04/Grao-de-cafe.jpg",
  },
  usersLikeThis: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

export const ReviewModel = model("Review", reviewSchema);
