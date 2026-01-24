const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routers/authRouters.js');
const questionRoutes = require('./routers/questionRouters.js');
const resultRoutes = require('./routers/resultRouters.js');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('WhyFearAI Backend API is running...');
});


app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/result', resultRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});