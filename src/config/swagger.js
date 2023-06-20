const { configDotenv } = require("dotenv");
const config = require("./config");
const swaggerOptions = {
  swagger: {
    info: {
      title: "Everymundo API",
      description: "Fares API for Everymundo",
      version: "0.1.0",
    },

    host: config.env == "production" ? config.domain : "localhost:3000",
    servers: [
      {
        url: `http://localhost:3000`,
        description: "Local server",
      },
    ],

    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    externalDocs: {
      description: "Find more info here",
      url: "https://swagger.io",
    },
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "apiKey",
        in: "header",
      },
    },
    security: [
      {
        apiKey: [],
      },
    ],
  },
};

module.exports = swaggerOptions;
