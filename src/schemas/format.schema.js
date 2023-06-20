const { currencySchema } = require("./currency.schema");
const { countrySchema } = require("./countries.schema");

const formatSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    currencyId: { type: "string" },
    countryId: { type: "string" },
    currencyType: {
      type: "string",
      enum: ["symbol", "code"],
    },
    currencyPosition: {
      type: "string",
      enum: ["before", "after"],
    },
    cents: { type: "boolean" },
    allFormat: {
      type: "string",
      enum: ["#,###.##", "#.###,##"],
    },
    currency: currencySchema,
    country: countrySchema,
  },
};

const createFormatSchema = {
  type: "object",
  properties: {
    currencyId: { type: "string" },
    countryId: { type: "string" },
    currencyType: {
      type: "string",
      enum: ["symbol", "code"],
    },
    currencyPosition: {
      type: "string",
      enum: ["before", "after"],
    },
    cents: { type: "boolean" },
    allFormat: {
      type: "string",
      enum: ["#,###.##", "#.###,##"],
    },
  },
  required: [
    "currencyId",
    "countryId",
    "currencyType",
    "currencyPosition",
    "cents",
    "allFormat",
  ],
};

const updateFormatSchema = {
  type: "object",
  properties: {
    currencyId: { type: "string" },
    countryId: { type: "string" },
    currencyType: {
      type: "string",
      enum: ["symbol", "code"],
    },
    currencyPosition: {
      type: "string",
      enum: ["before", "after"],
    },
    cents: { type: "boolean" },
    allFormat: {
      type: "string",
      enum: ["#,###.##", "#.###,##"],
    },
  },
};

buildFareSchema = {
  type: "object",
  properties: {
    countryCode: { type: "string" },
    currencyCode: { type: "string" },
    amount: { type: "number" },
  },
};

fareSchema = {
  type: "object",
  properties: {
    fare: { type: "string" },
  },
};

module.exports = {
  formatSchema,
  createFormatSchema,
  updateFormatSchema,
  buildFareSchema,
  fareSchema,
};
