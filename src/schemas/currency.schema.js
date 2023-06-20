const currencySchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    symbol: { type: "string" },
    code: { type: "string" },
  },
};

const createCurrencySchema = {
  type: "object",
  properties: {
    symbol: { type: "string" },
    code: { type: "string" },
  },
  required: ["symbol", "code"],
};

const updateCurrencySchema = {
  type: "object",
  properties: {
    symbol: { type: "string" },
    code: { type: "string" },
  },
};

module.exports = {
  currencySchema,
  createCurrencySchema,
  updateCurrencySchema,
};
