import express from "express";
import userRouter from "./routes/user.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js"
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path: "./data/config.env"
});

//using middleware to get data in the form of json
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);
app.use(errorMiddleware);
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}));

app.get("/",(req,res)=>{
    res.send("get api is created");
})
