import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, maxLength: 80, required: true },
  body: { type: String, required: true },
  usersLikeThis: [{ type: Schema.Types.ObjectId, ref: "User" }],
  review: { type: Schema.Types.ObjectId, ref: "Review" },
});

export const CommentModel = model("Comment", commentSchema);
