//Here we are creating the schema and the model

import mongoose from "mongoose";
import validator from "validator";
import { commentSchema } from "./commentSchema.js";

//create and define the schema
const postSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name Must Contain At Least 3 Characters!"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please Provide A Valid Email!"],
  },
  content: {
    type: String,
    required: true,
    minLength: [20, "Content Must Contain atleast 20 characters!"],
  },
  timeStamp:{
    type: Date,
    default: new Date(),
  },
});

//create model, give it a name and mention the schema to be followed
// here, name = Post, schema = postSchema
export const Post = mongoose.model("Post", postSchema);
