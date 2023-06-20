const fastify = require("fastify")({
  logger: true,
});

const server = require("../server");
const connect = require("./models");

const start = async () => {
  try {
    server(fastify);
    connect();

    fastify.listen(
      {
        port: 3000,
      },
      (err, address) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log(`Server listening at ${address}`);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

start();
