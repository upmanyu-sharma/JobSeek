const mongoose = require("mongoose");

DBConnect();

async function DBConnect() {
  try {
    await mongoose.connect(
      "mongodb+srv://UPMANYU:OAHKCV%4027@mernprojects.hcbomvi.mongodb.net/JobHelpNew"
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed");
  }
}

module.exports = mongoose;
