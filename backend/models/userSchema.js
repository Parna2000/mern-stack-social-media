import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone Number Must Contain Exactly 10 Digits!"],
    maxLength: [10, "Phone Number Must Contain Exactly 10 Digits!"],
  },
  dob: {
    type: Date,
    required: [true, "DOB is required!"],
  },
  gender: {
    type: String,
    required: true,
    enums: ["Male", "Female", "Others"],
  },
  password: {
    type: String,
    minLength: [8, "Password Must Contain At least 8 Characters!"],
    required: true,
    // this means when we will get the user, we will get all its details except the password
    select: false,
  },
  userAvatar: {
    public_id: String,
    url: String,
  },
  score:{
    type: Number,
    default: 0,
  },
});

// Now we will hash the password just after receiving it from user,
// before saving it to the database.
userSchema.pre("save", async function (next) {
  //if password is not entered
  if (!this.isModified("password")) {
    next();
  }
  //else hash it
  this.password = await bcrypt.hash(this.password, 10);
});

// Now we have to create a method to compare the hashed password with the user entered password
// here 'comparePassword' is the name of the password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Now we have to create a method to generate a token whenever an user logs in
userSchema.methods.generateJsonWebTokens = function () {
  // here we need an unique id and we know that id generated by mongoDB is unique, so we will use it.
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

//create model, give it a name and mention the schema to be followed
// here, name = User, schema = userSchema
export const User = mongoose.model("User", userSchema);
