const mongoose = require("mongoose");

const formatSchema = new mongoose.Schema({
  currencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currency",
  },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
  },
  currencyType: {
    type: String,
    enum: ["symbol", "code"],
  },
  currencyPosition: {
    type: String,
    enum: ["before", "after"],
  },
  cents: Boolean,
  allFormat: {
    type: String,
    enum: ["#,###.##", "#.###,##"],
  },
});

const Format = mongoose.model("Format", formatSchema);

module.exports = Format;
