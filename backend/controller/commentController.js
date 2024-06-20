// Here we are fetching the user inputs and creating the Message
// We don't need any authorisation or authentication for sending messages
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { Post } from "../models/postSchema.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middleware/errorMiddleWare.js";
import { Comment } from "../models/commentSchema.js";

export const sendComment = catchAsyncErrors(async (req, res, next) => {
  const { content, postId } = req.body;
  if (!content || !postId) {
    return next(new ErrorHandler("Please fill full form!", 400));
  }
  const user = req.user;
  const post = await Post.findOne({ _id: postId });
  // if the user donot exist
  if (!post) {
    return next(new ErrorHandler("Post Doesnot Exist", 400));
  }
  user.score += 5;
  await user.save();
  const comment = await Comment.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    content,
    postId,
  });
  res.status(200).json({
    success: true,
    message: "Comment sent successfully!",
  });
});

// function to get comments by post id
export const getCommentsByPostId = catchAsyncErrors(async (req, res, next) => {
  const {id} = req.params;
  const comments = await Comment.find({ postId: id });
  res.status(200).json({
    success: true,
    comments,
  });
});

// function to get all comments
export const getAllComments = catchAsyncErrors(async (req, res, next) => {
  const comments = await Comment.find();
  res.status(200).json({
    success: true,
    comments,
  });
});
