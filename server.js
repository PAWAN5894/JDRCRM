// backend/server.js

// 1. Load Environment Variables (Must be first!)
require('dotenv').config(); // Reads the .env file

// 2. Import Dependencies
const express = require('express');     // Web server framework
const mongoose = require('mongoose');   // MongoDB interaction
const cors = require('cors');         // Cross-Origin Resource Sharing

// --- Require Route Files --- (Do this ONCE for each route file)
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes'); // Require course routes

// 3. Create Express App Instance
const app = express(); // 'app' is our main server object

// 4. Define Port
// Use the port from .env, or default to 5001 if not specified
const PORT = process.env.PORT || 5001;

// 5. --- Middleware --- (Runs on every request before routes)
app.use(cors()); // Allow requests from frontend origin
app.use(express.json()); // Parse incoming JSON request bodies

// 6. --- Database Connection ---
mongoose.connect(process.env.MONGODB_URI) // Use connection string from .env
  .then(() => {
    console.log('Successfully connected to MongoDB.'); // Log success
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error); // Log connection errors
  });

// 7. --- Use Routes --- (Tell Express which routes to use for which base paths)
// All routes defined in authRoutes will be prefixed with /api/auth
app.use('/api/auth', authRoutes);
// All routes defined in courseRoutes will be prefixed with /api/courses
app.use('/api/courses', courseRoutes);

// 8. --- Basic Test Route --- (Optional: Good for checking if server is up)
app.get('/', (req, res) => {
    res.send('Hello! The backend server is running.');
});

// 9. --- Start the Server --- (Keep this at the end)
app.listen(PORT, () => {
  // Use the PORT variable correctly here
  console.log(`Backend server is listening on http://localhost:${PORT}`);
});