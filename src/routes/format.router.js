const {
  formatSchema,
  createFormatSchema,
  updateFormatSchema,
  buildFareSchema,
  fareSchema,
} = require("../schemas/format.schema");

const FormatService = require("../services/format.service");
const formatService = new FormatService();

const formatRouter = (fastify, options, done) => {
  fastify.get(
    "/",
    {
      schema: {
        description: "Get all format",
        tags: ["format"],
        summary: "Get all format",
        response: {
          200: {
            description: "Successful response",
            type: "array",
            items: formatSchema,
          },
        },
      },
    },
    async (request, reply) => {
      const format = await formatService.getAll();
      reply.send(format);
    }
  );

  fastify.get(
    "/:id",
    {
      schema: {
        description: "Get a format by id",
        tags: ["format"],
        summary: "Get a format by id",
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "format id",
            },
          },
        },
        response: {
          200: {
            description: "Successful response",
            ...formatSchema,
          },
        },
      },
    },
    async (request, reply) => {
      const formatId = request.params.id;
      const format = await formatService.getById(formatId);
      reply.send(format);
    }
  );

  fastify.post(
    "/",
    {
      schema: {
        description: "Create a format",
        tags: ["format"],
        summary: "Create a format",
        body: createFormatSchema,
        response: {
          200: {
            description: "Successful response",
            ...formatSchema,
          },
        },
      },
    },
    async (request, reply) => {
      const format = await formatService.create(request.body);
      reply.send(format);
    }
  );

  fastify.put(
    "/:id",
    {
      schema: {
        description: "Update a format by id",
        tags: ["format"],
        summary: "Update a format by id",
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "format id",
            },
          },
        },
        body: updateFormatSchema,
        response: {
          200: {
            description: "Successful response",
            ...formatSchema,
          },
        },
      },
    },
    async (request, reply) => {
      const formatId = request.params.id;
      const format = await formatService.update(formatId, request.body);
      reply.send(format);
    }
  );

  fastify.delete(
    "/:id",
    {
      schema: {
        description: "Delete a format by id",
        tags: ["format"],
        summary: "Delete a format by id",
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "format id",
            },
          },
        },
        response: {
          200: {
            description: "Successful response",
            ...formatSchema,
          },
        },
      },
    },
    async (request, reply) => {
      const formatId = request.params.id;
      const format = await formatService.delete(formatId);
      reply.send(format);
    }
  );

  fastify.get(
    "/build_fare",
    {
      schema: {
        description: "Build a fare",
        tags: ["format"],
        summary: "Build a fare",
        querystring: buildFareSchema,
        response: {
          200: {
            description: "Successful response",
            ...fareSchema,
          },
        },
      },
    },
    async (request, reply) => {
      const fare = await formatService.buildFare(request.query);
      reply.send(fare);
    }
  );

  fastify.get(
    "/build_fare/:id",
    {
      schema: {
        description: "Build a fare using formatId",
        tags: ["format"],
        summary: "Build a fare using formatId",
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "format id",
            },
          },
        },
        querystring: {
          type: "object",
          properties: {
            amount: {
              type: "number",
              description: "amount",
            },
          },
        },
        response: {
          200: {
            description: "Successful response",
            ...fareSchema,
          },
        },
      },
    },
    async (request, reply) => {
      const formatId = request.params.id;
      const fare = await formatService.buildFareByFormatId(
        request.query,
        formatId
      );
      reply.send(fare);
    }
  );

  done();
};

module.exports = formatRouter;
