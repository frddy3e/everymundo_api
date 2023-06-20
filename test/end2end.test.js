// const { expect } = require("chai");
// const sinon = require("sinon");
// const request = require("supertest");
// const fastify = require("fastify")({
//   logger: true,
// });

// const server = require("../server");

// describe("End-to-End Testing", () => {
//   server(fastify);

//   before(() => {
//     fastify.listen({ port: 3000 }); // Start the server
//   });

//   after(() => {
//     fastify.close(); // Close the server
//   });

//   it("should return a welcome message", async () => {
//     const res = await request(fastify).get("/");
//     expect(res.status).to.equal(200);
//     expect(res.body.message).to.equal("Welcome to the API");
//   });
// });
