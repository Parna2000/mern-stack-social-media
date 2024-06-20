//Here we are creating the schema and the model

import mongoose from "mongoose";
import validator from "validator";

//create and define the schema
export const commentSchema = new mongoose.Schema({
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
    minLength: [5, "Comment Must Contain atleast 5 characters!"],
  },
  timeStamp:{
    type: Date,
    default: new Date(),
  },
  postId:{
    type: String,
    required: true,
  },
});

//create model, give it a name and mention the schema to be followed
// here, name = Comment, schema = commentSchema
export const Comment = mongoose.model("Comment", commentSchema);
