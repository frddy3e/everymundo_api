const dotenv = require("dotenv");

dotenv.config();

const config = {
  mongoUrl: process.env.MONGODB_URL,
  domain: process.env.DOMAIN,
  env: process.env.NODE_ENV,
};

module.exports = config;
