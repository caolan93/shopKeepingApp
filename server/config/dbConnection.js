const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
