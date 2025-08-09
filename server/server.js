// import axios from 'axios';
// axios.defaults.withCredentials = true;
// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const issueRoutes = require('./routes/issueRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // your frontend URL
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
