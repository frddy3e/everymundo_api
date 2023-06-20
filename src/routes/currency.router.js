const {
  currencySchema,
  createCurrencySchema,
  updateCurrencySchema,
} = require("../schemas/currency.schema");

const CurrencyService = require("../services/currency.service");
const currencyService = new CurrencyService();

const currencyRouter = (fastify, options, done) => {
  fastify.get(
    "/",
    {
      schema: {
        description: "Get all currency",
        tags: ["currency"],
        summary: "Get all currency",
        response: {
          200: {
            description: "Successful response",
            type: "array",
            items: currencySchema,
          },
        },
      },
    },
    async (request, reply) => {
      const currency = await currencyService.getAll();
      reply.send(currency);
    }
  );

  fastify.get(
    "/:id",
    {
      schema: {
        description: "Get a currency by id",
        tags: ["currency"],
        summary: "Get a currency by id",
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "currency id",
            },
          },
        },
        response: {
          200: {
            description: "Successful response",
            ...currencySchema,
          },
        },
      },
    },
    async (request, reply) => {
      const currencyId = request.params.id;
      const currency = await currencyService.getById(currencyId);
      reply.send(currency);
    }
  );

  fastify.post(
    "/",
    {
      schema: {
        description: "Create a currency",
        tags: ["currency"],
        summary: "Create a currency",
        body: createCurrencySchema,
        response: {
          200: {
            description: "Successful response",
            ...currencySchema,
          },
        },
      },
    },
    async (request, reply) => {
      const currency = await currencyService.create(request.body);
      reply.send(currency);
    }
  );

  fastify.put(
    "/:id",
    {
      schema: {
        description: "Update a currency",
        tags: ["currency"],
        summary: "Update a currency",
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "currency id",
            },
          },
        },
        body: updateCurrencySchema,
        response: {
          200: {
            description: "Successful response",
            ...currencySchema,
          },
        },
      },
    },
    async (request, reply) => {
      const currencyId = request.params.id;
      const currency = await currencyService.update(currencyId, request.body);
      reply.send(currency);
    }
  );

  fastify.delete(
    "/:id",
    {
      schema: {
        description: "Delete a currency",
        tags: ["currency"],
        summary: "Delete a currency",
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "currency id",
            },
          },
        },
        response: {
          200: {
            description: "Successful response",
            ...currencySchema,
          },
        },
      },
    },
    async (request, reply) => {
      const currencyId = request.params.id;
      const currency = await currencyService.delete(currencyId);
      reply.send(currency);
    }
  );

  done();
};

module.exports = currencyRouter;
