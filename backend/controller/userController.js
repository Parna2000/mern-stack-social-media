import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/errorMiddleWare.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtTokens.js";
import cloudinary from "cloudinary";

// function for user register
export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("User Avatar Required!", 400));
  }
  const { userAvatar } = req.files;
  // specify the allowed formats
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  // mimetype checks for the extension of the file
  if (!allowedFormats.includes(userAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }

  const { firstName, lastName, email, phone, password, gender, dob } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob
  ) {
    return next(new ErrorHandler("Please Provide Full Details!", 400));
  }

  // Checking if the user is already registered
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(`User already registered with this email!`, 400)
    );
  }
  // now posting image on cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    userAvatar.tempFilePath
  );

  // if response donot come from cloudinary
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error",
      cloudinary.error || "Unknown Cloudinary Error"
    );
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    userAvatar: {
      // we can see public_id and secure_url when we console.log() cloudinaryResponse
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  generateToken(user, "User Registered!", 200, res);
});

// function for user login
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  // if any value is missing
  if (!email || !password || !confirmPassword) {
    return next(new ErrorHandler("Please Provide All Details!", 400));
  }

  // if password and confirmPassword donot match
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and Confirm Password Do Not Match!", 400)
    );
  }

  // now if everything is Ok, we will find the user by the email as the email is unique for all users
  // findOne() is the mongoDB function to find a user with mentioned property
  // select() help us to select the field whose 'select' is set to false in the definition of schema
  const user = await User.findOne({ email }).select("+password");

  // if the user donot exist
  if (!user) {
    return next(new ErrorHandler("Invalid Password Or Email!", 400));
  }

  // now we have to match the password and we will do this using 'comparePassword' method of User model
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password Or Email!", 400));
  }
  generateToken(user, "User Logged In Successfully!", 200, res);
});

// function to get all details of a user
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

// function to logOut the user
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("userToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Logged Out Successfully!",
    });
});
