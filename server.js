require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helpdeskRoutes = require('./api/route/helpdesk.routes');

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Basic API route
app.use('/api/helpdesk', helpdeskRoutes);

// MongoDB Connection (Mongoose v6+ không cần options cũ nữa)
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
