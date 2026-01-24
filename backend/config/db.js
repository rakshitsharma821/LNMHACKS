const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MONGO_URI USED =>", process.env.uri);

    const conn = await mongoose.connect(process.env.uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
