import express from 'express';
import 'dotenv/config'
import { clerkMiddleware } from '@clerk/express'
import cors from "cors";

import { connectDB } from './lib/connectDb.js';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import commentRouter from './routes/comment.route.js';
import webHookRouter from './routes/webhook.route.js';


const app = express();

app.use(cors(process.env.CLIENT_URL));
app.use(clerkMiddleware())
app.use("/webhooks", webHookRouter)
app.use(express.json());

app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// routes
app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/comments", commentRouter)


// error handling
app.use((err, req, res, next) => {
   res.status(err.status || 500);
   res.json({
      status: err.status || 500,
      message: err.message || "Something went wrong",
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
   });
});

// port
const port = process.env.PORT || 3000;
app.listen(port, () => {
   connectDB();
   console.log('Server is running on port ' + port);
});