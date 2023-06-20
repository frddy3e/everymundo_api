"use strict";
const serverless = require("serverless-http");
const connect = require("./src/models");
const fastify = require("fastify")({
  logger: true,
});

const server = require("./server");
server(fastify);
connect();

module.exports.handler = serverless(fastify);
