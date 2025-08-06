import axios from 'axios';
axios.defaults.withCredentials = true;

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const issueRoutes = require('./routes/issueRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',  // your frontend origin
  credentials: true                 // allow cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
