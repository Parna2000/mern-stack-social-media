import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { Post } from "../models/postSchema.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middleware/errorMiddleWare.js";

// function to send post
export const sendPost = catchAsyncErrors(async (req, res, next) => {
  const { content } = req.body;
  if (!content) {
    return next(new ErrorHandler("Please fill full form!", 400));
  }
  const user = req.user;
  user.score += 10;
  await user.save();
  await Post.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    content,
  });
  res.status(200).json({
    success: true,
    message: "Post sent successfully!",
  });
});

// function to get all posts
export const getAllPosts = catchAsyncErrors(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    success: true,
    posts,
  });
});

// function to get posts by user email
export const getMyPosts = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  const posts = await Post.find({ email: user.email });
  res.status(200).json({
    success: true,
    posts,
  });
});
