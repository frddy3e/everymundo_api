const boom = require("@hapi/boom");
const Currency = require("../models/currency.model");

class CurrenciesServices {
  constructor() {}

  async getAll() {
    const currencies = await Currency.find().lean();
    return currencies.map((currency) => {
      const { _id, symbol, code } = currency;
      return { id: _id, symbol, code };
    });
  }

  async getByCode(code) {
    const currency = await Currency.findOne({
      code: code,
    }).lean();
    if (!currency) {
      throw boom.notFound("Currency not found");
    }
    return { ...currency, id: currency._id };
  }

  async getById(id) {
    const currency = await Currency.findById(id).lean();
    if (!currency) {
      throw boom.notFound("Currency not found");
    }
    return { id: currency._id, symbol: currency.symbol, code: currency.code };
  }

  async create(data) {
    const newCurrency = new Currency(data);
    await newCurrency.save();
    return {
      id: newCurrency._id,
      symbol: newCurrency.symbol,
      code: newCurrency.code,
    };
  }

  async update(id, changes) {
    const updateCurrency = await Currency.findByIdAndUpdate(id, changes, {
      new: true,
      runValidators: true,
    });
    if (!updateCurrency) {
      throw boom.notFound("Currency not found");
    }
    return { ...updateCurrency, id: updateCurrency._id };
  }

  async delete(id) {
    const deletedCurrency = await Currency.findByIdAndDelete(id);
    if (!deletedCurrency) {
      throw boom.notFound("Currency not found");
    }
    return deletedCurrency.id;
  }
}

module.exports = CurrenciesServices;
