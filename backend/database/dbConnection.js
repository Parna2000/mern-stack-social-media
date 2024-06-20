import mongoose from "mongoose";

// connect to database
export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DATABASE_NAME,
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(`Some error occured while connecting to database: ${err}`);
    });
};
