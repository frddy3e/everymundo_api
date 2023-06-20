const {
  countrySchema,
  createCountrySchema,
  updateCountrySchema,
} = require("../schemas/countries.schema");

const CountryService = require("../services/countries.service");
const countryService = new CountryService();

const countryRouter = (fastify, options, done) => {
  fastify.get(
    "/",
    {
      schema: {
        description: "Get all countries",
        tags: ["countries"],
        summary: "Get all countries",
        response: {
          200: {
            description: "Successful response",
            type: "array",
            items: countrySchema,
          },
        },
      },
    },
    async (request, reply) => {
      const countries = await countryService.getAll();
      reply.send(countries);
    }
  );

  fastify.get(
    "/:id",
    {
      schema: {
        description: "Get a country by id",
        tags: ["countries"],
        summary: "Get a country by id",
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "country id",
            },
          },
        },
        response: {
          200: {
            description: "Successful response",
            ...countrySchema,
          },
        },
      },
    },
    async (request, reply) => {
      const countryId = request.params.id;
      const country = await countryService.getById(countryId);
      reply.send(country);
    }
  );

  fastify.post(
    "/",
    {
      schema: {
        description: "Create a new country",
        tags: ["countries"],
        summary: "Create a new country",
        body: createCountrySchema,
        response: {
          201: {
            description: "Successful response",
            ...countrySchema,
          },
        },
      },
    },
    async (request, reply) => {
      const countryData = request.body;
      const newCountry = await countryService.create(countryData);
      reply.status(201).send(newCountry);
    }
  );

  fastify.put(
    "/:id",
    {
      schema: {
        description: "Update a country by id",
        tags: ["countries"],
        summary: "Update a country by id",
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "country id",
            },
          },
        },
        body: updateCountrySchema,
        response: {
          200: {
            description: "Successful response",
            ...countrySchema,
          },
        },
      },
    },
    async (request, reply) => {
      const countryId = request.params.id;
      const countryData = request.body;
      const updatedCountry = await countryService.update(
        countryId,
        countryData
      );
      reply.send(updatedCountry);
    }
  );

  fastify.delete(
    "/:id",
    {
      schema: {
        description: "Delete a country by id",
        tags: ["countries"],
        summary: "Delete a country by id",
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "country id",
            },
          },
        },
        response: {
          200: {
            description: "Successful response",
            type: "string",
          },
        },
      },
    },
    async (request, reply) => {
      const countryId = request.params.id;
      const deletedCountry = await countryService.delete(countryId);
      reply.send(deletedCountry.id);
    }
  );

  done();
};

module.exports = countryRouter;
