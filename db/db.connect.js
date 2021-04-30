const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://shubham:2pQQtOwM1yQNQInq@neog-cluster.wiph4.mongodb.net/videos';

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Successfully connected to database");
  } catch (error) {
    console.error("Database connection failed")
  }
}

module.exports = dbConnect;