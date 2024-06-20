// here we define the route through which the message will be sent to the database.

import express from "express";
import { isUserAuthenticated } from "../middleware/auth.js";
import {
  getAllComments,
  getCommentsByPostId,
  sendComment,
} from "../controller/commentController.js";

const router = express.Router();

// route for posting a comment
router.post("/send", isUserAuthenticated, sendComment);

// route to get comments by post id
router.get("/getbyid/:id", isUserAuthenticated, getCommentsByPostId);

// route to get all comments
router.get("/getall", isUserAuthenticated, getAllComments);

export default router;
