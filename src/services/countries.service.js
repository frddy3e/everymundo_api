const boom = require("@hapi/boom");
const Country = require("../models/country.model");

class CountriesServices {
  constructor() {}

  async getAll() {
    const countries = await Country.find().lean();
    return countries.map((country) => {
      const { _id, name, code } = country;
      return { id: _id, name, code };
    });
  }

  async getById(id) {
    const country = await Country.findById(id).lean();
    if (!country) {
      throw boom.notFound("Country not found");
    }
    return { id: country._id, name: country.name, code: country.code };
  }

  async getByCode(code) {
    const country = await Country.findOne({
      code: code,
    }).lean();
    if (!country) {
      throw boom.notFound("Country not found");
    }
    return { ...country, id: country._id };
  }

  async create(data) {
    const newCountry = new Country(data);
    await newCountry.save();
    return {
      id: newCountry._id,
      name: newCountry.name,
      code: newCountry.code,
    };
  }

  async update(id, changes) {
    const updatedCountry = await Country.findByIdAndUpdate(id, changes, {
      new: true,
      runValidators: true,
    });
    if (!updatedCountry) {
      throw boom.notFound("Country not found");
    }
    return updatedCountry;
  }

  async delete(id) {
    const deletedCountry = await Country.findByIdAndDelete(id);
    if (!deletedCountry) {
      throw boom.notFound("Country not found");
    }
    return deletedCountry;
  }
}

module.exports = CountriesServices;
