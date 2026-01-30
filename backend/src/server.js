import express from "express";
import "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Hello from server");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});

export default app;
