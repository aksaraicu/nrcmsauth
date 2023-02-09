import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import PostRoutes from "./routes/PostRoutes.js";
import UserRoute from "./routes/UserRoute.js";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());

app.use(express.static("public"));

app.use(PostRoutes);
app.use(UserRoute);

app.listen("5000", () => console.log("Server up and running "));
