import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleWare.js";
import { User } from "../models/userSchema.js";

// We have to do some authentication
// authentication helps to find who the user is
export const isUserAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // AUTHENTICATION
  // now we have to get the 'userToken'
  const token = req.cookies.userToken;

  // if token does not exists
  if (!token) {
    return next(new ErrorHandler("User Not Authenticated", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  next();
});
