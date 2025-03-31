import express from 'express';
import 'dotenv/config'

import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import commentRouter from './routes/comment.route.js';
import { connectDB } from './lib/connectDb.js';

const app = express();
app.use(express.json());


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