// here we define the route through which the message will be sent to the database.

import express from "express";
import {
  getAllPosts,
  getMyPosts,
  sendPost,
} from "../controller/postController.js";
import { isUserAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// route for posting content
router.post("/send", isUserAuthenticated, sendPost);

// route to fetch all posts
router.get("/getall", isUserAuthenticated, getAllPosts);

// route to get posts by user email
router.get("/getmyposts", isUserAuthenticated, getMyPosts);

export default router;
