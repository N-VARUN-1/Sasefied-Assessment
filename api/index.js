import mongoose from "mongoose";
import express from "express";

import formRouter from "../api/routes/form.route.js";

const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => {
    console.log("MongoDB is Connected!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api", formRouter);

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
