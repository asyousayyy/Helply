const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // DB connection
const issueRoutes = require('./routes/issueRoutes'); // API routes

dotenv.config(); 
connectDB(); 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/issues', issueRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
