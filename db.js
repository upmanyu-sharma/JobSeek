const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
DBConnect();

async function DBConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed");
  }
}

module.exports = mongoose;
