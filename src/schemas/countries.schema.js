const countrySchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    code: { type: "string" },
  },
};

const createCountrySchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    code: { type: "string" },
  },
  required: ["name", "code"],
};

const updateCountrySchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    code: { type: "string" },
  },
};

module.exports = {
  countrySchema,
  createCountrySchema,
  updateCountrySchema,
};
