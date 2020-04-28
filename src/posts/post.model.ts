import * as mongoose from "mongoose";
import { IPost } from "./post.interface";

const postSchema = new mongoose.Schema({
  //Id: String,
  Category: {
    type: String,
    required: [true, "Category is required"],
  },
  Date: {
    type: Date,
    required: [true, "Date is required"],
  },
  Categories: {
    type: Array,
    required: [true],
  },
  Content: {
    type: String,
    required: [true, "Content is required"],
  },
  Title: {
    type: String,
    required: [true, "Title is required"],
  },
});

const postModel = mongoose.model<IPost & mongoose.Document>(
  "posts",
  postSchema
);

export default postModel;
