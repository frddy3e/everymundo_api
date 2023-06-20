const fastifyPlugin = require("fastify-plugin");
const countryRouter = require("./countries.router");
const currencyRouter = require("./currency.router");
const formatRouter = require("./format.router");

const routerApi = fastifyPlugin((fastify, options, done) => {
  fastify.register(countryRouter, { prefix: "/api/v1/countries" });
  fastify.register(currencyRouter, { prefix: "/api/v1/currencies" });
  fastify.register(formatRouter, { prefix: "/api/v1/formats" });
  done();
});

module.exports = routerApi;
