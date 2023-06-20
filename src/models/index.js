const mongoose = require("mongoose");
const config = require("../config/config");

const connect = async () => {
  console.log("Connecting to MongoDB");
  await mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
};

module.exports = connect;
