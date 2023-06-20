const swaggerOptions = require("./src/config/swagger");
const swaggerUIOptions = require("./src/config/swaggerUI");
const router = require("./src/routes");

module.exports = (fastify) => {
  fastify.register(require("@fastify/swagger"), swaggerOptions);
  fastify
    .register(require("@fastify/swagger-ui"), swaggerUIOptions)
    .then(() => {
      fastify.register(router);
      fastify.ready((err) => {
        if (err) throw err;
        fastify.swagger();
      });
    });
};
