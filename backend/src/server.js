import express from "express";
import cors from "cors";
import {clerkMiddleware} from "@clerk/express";

import userRoutes from "./routes/user.route.js"

import "./config/env.js";
import { connectDB } from "./config/db.js";



const app = express();

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());

connectDB();

app.use("/api/user",userRoutes);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});

export default app;
