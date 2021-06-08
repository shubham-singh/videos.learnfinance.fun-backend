const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth.route.js');
const videoRoutes = require('./routes/video.route.js');
const rateRoutes = require('./routes/rating.route.js');
const historyRoutes = require('./routes/history.route.js');

const { checkUser } = require('./middleware/auth.middleware.js');

const app = express();

app.use(cors());

app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Learn Finance API'
  })
})

app.use('/video', videoRoutes);

app.use('/user', authRoutes);

app.use(checkUser);

app.use('/video/rate', rateRoutes);

app.use('/history', historyRoutes);

app.listen(process.env.PORT || 3000, '0.0.0.0');