import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middleware/errorMiddleWare.js";
import userRouter from "./router/userRouter.js";
import postRouter from "./router/postRouter.js";
import commentRouter from "./router/commentRouter.js";

const app = express();

// path of environment variables
config({path: "./config/config.env"});

// to connect frontend and backend
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
}));

// to parse the cookies
app.use(cookieParser());

// to parse json data in string format
app.use(express.json());

// to get the user inputs
app.use(express.urlencoded({extended: true}));

// to upload files to cloudinary
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

app.use("/api/v1/user",userRouter);
app.use("/api/v1/post",postRouter);
app.use("/api/v1/comment",commentRouter);

// to connect to database
dbConnection();

// to handle errors
app.use(errorMiddleware);
export default app;
