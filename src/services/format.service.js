const boom = require("@hapi/boom");
const Format = require("../models/format.model");

const CurrencyService = require("./currency.service");
const CountryService = require("./countries.service");
const currencyService = new CurrencyService();
const countryService = new CountryService();

class FormatService {
  constructor() {}

  async getAll() {
    // find and include the currency and country information
    const formats = await Format.find()
      .populate("currencyId")
      .populate("countryId")
      .lean();
    console.log(formats);
    return formats.map((format) => {
      return {
        id: format._id,
        ...format,
        currency: {
          id: format.currencyId._id,
          ...format.currencyId,
        },
        country: {
          id: format.countryId._id,
          ...format.countryId,
        },
      };
    });
  }

  async getById(id) {
    const format = await Format.findById(id)
      .populate("currencyId")
      .populate("countryId")
      .lean();
    if (!format) {
      throw boom.notFound("Format not found");
    }
    return {
      id: format._id,
      ...format,
      currency: {
        id: format.currencyId._id,
        ...format.currencyId,
      },
      country: {
        id: format.countryId._id,
        ...format.countryId,
      },
    };
  }

  async create(data) {
    const newFormat = new Format(data);
    await newFormat.save();
    return {
      id: newFormat._id,
      ...newFormat,
    };
  }

  async update(id, changes) {
    const updateFormat = await Format.findByIdAndUpdate(id, changes, {
      new: true,
      runValidators: true,
    });
    if (!updateFormat) {
      throw boom.notFound("Format not found");
    }
    return { ...updateFormat, id: updateFormat._id };
  }

  async delete(id) {
    const deletedFormat = await Format.findByIdAndDelete(id);
    if (!deletedFormat) {
      throw boom.notFound("Format not found");
    }
    return deletedFormat.id;
  }

  async getByCurrencyIdAndCountryId(currencyId, countryId) {
    const format = await Format.findOne({ currencyId, countryId })
      .populate("currencyId")
      .populate("countryId")

      .lean();
    return {
      id: format._id,
      ...format,
      currency: {
        id: format.currencyId._id,
        ...format.currencyId,
      },
      country: {
        id: format.countryId._id,
        ...format.countryId,
      },
    };
  }

  async buildFare(data) {
    const country = await countryService.getByCode(data.countryCode);
    const currency = await currencyService.getByCode(data.currencyCode);

    const format = await this.getByCurrencyIdAndCountryId(
      currency.id,
      country.id
    );

    if (!format) {
      throw boom.notFound("Format not found");
    }

    const { amount } = data;
    return this.applyFormat(format, amount);
  }

  async buildFareByFormatId(data, formatId) {
    const format = await this.getById(formatId);

    if (!format) {
      throw boom.notFound("Format not found");
    }

    const { amount } = data;

    return this.applyFormat(format, amount);
  }

  applyFormat(format, amount) {
    const { currencyType, currencyPosition, cents, allFormat } = format;

    let result = "";

    let intPart = Math.trunc(amount);
    let decimalPart = amount - intPart;
    decimalPart = decimalPart.toFixed(2).replace("0.", "");

    if (allFormat == "#.###,##") {
      intPart = intPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      result = intPart + (cents ? `,${decimalPart}` : "");
    } else {
      intPart = intPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      result = intPart + (cents ? `.${decimalPart}` : "");
    }

    if (currencyPosition === "before") {
      result = `${format.currency[currencyType]} ${result}`;
    } else {
      result = `${result} ${format.currency[currencyType]}`;
    }

    return result;
  }
}

module.exports = FormatService;
