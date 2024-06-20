import express from "express";
import {
  getUserDetails,
  login,
  logout,
  register,
} from "../controller/userController.js";
import { isUserAuthenticated } from "../middleware/auth.js";
const router = express.Router();

// route for registering users
router.post("/register", register);

// route for user login
router.post("/login", login);

// route for user logout
router.get("/logout",isUserAuthenticated, logout);

// route to get user details
router.get("/me", isUserAuthenticated, getUserDetails);

export default router;
