const mongoose = require('mongoose');

const username = process.env['username'];
const password = process.env['password'];

const dbURI = 'mongodb+srv://shubham:2pQQtOwM1yQNQInq@neog-cluster.wiph4.mongodb.net/videos';
const dbURI = `mongodb+srv://${username}:${password}@neog-cluster.wiph4.mongodb.net/videos`;

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