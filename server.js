require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;
// Middleware
app.use(cors());
app.use(express.json());
// Basic API route
app.get("/", (req, res) => {
  res.send("MERN Backend is running!");
});
// MongoDB Connection
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
