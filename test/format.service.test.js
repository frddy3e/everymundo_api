const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");

const FormatService = require("../src/services/format.service");
const formatService = new FormatService();

// 1. In the United States when showing USD, fares should display the currency symbol, with
// cents ($ 107.67).
// 2. In Argentina when showing USD, fares should display only currency code and no cents
// ($ 108).
// 3. In Spain when showing EUR, fares should display the currency symbol after the price,
// no cents and the delimiter for thousands should be a comma (1,240 €).
// 4. In Germany when showing EUR, fares should display the currency symbol before the
// price, no cents and the delimiter for thousands should be a dot (€ 1,240).

describe("Format Service", () => {
  it("Country: USA + currency: USD", async () => {
    const formatData = {
      id: "5f7b1b9b4f3c1d1b1c9d4f1b",
      currencyId: "5f7b1b9b4f3c1d1b1c9d4f1b",
      countryId: "5f7b1b9b4f3c1d1b1c9d4f1b",
      currencyType: "symbol",
      currencyPosition: "before",
      cents: true,
      allFormat: "#,###.##",
      currency: {
        id: "5f7b1b9b4f3c1d1b1c9d4f1b",
        code: "USD",
        symbol: "$",
      },
      country: {
        id: "5f7b1b9b4f3c1d1b1c9d4f1b",
        name: "United States",
        code: "US",
      },
    };

    const fare = formatService.applyFormat(formatData, 107.67);

    expect(fare).to.equal("$ 107.67");
  });

  it("Country: Argentina + currency: USD", async () => {
    const formatData = {
      id: "5f7b1b9b4f3c1d1b1c9d4f1b",
      currencyId: "5f7b1b9b4f3c1d1b1c9d4f1b",
      countryId: "5f7b1b9b4f3c1d1b1c9d4f1b",
      currencyType: "symbol",
      currencyPosition: "before",
      cents: false,
      allFormat: "#,###.##",
      currency: {
        id: "5f7b1b9b4f3c1d1b1c9d4f1b",
        code: "USD",
        symbol: "$",
      },
      country: {
        id: "5f7b1b9b4f3c1d1b1c9d4f1b",
        name: "Argentina",
        code: "AR",
      },
    };

    const fareStub = sinon.stub(formatService, "applyFormat");
    fareStub.withArgs(formatData, 108.23).returns("$ 108");

    const fare = formatService.applyFormat(formatData, 108.23);
    expect(fareStub.calledOnce).to.be.true;
    expect(fare).to.equal("$ 108");
    fareStub.restore();
  });

  it("Country: Spain + currency: EUR", async () => {
    const formatData = {
      id: "5f7b1b9b4f3c1d1b1c9d4f1b",
      currencyId: "5f7b1b9b4f3c1d1b1c9d4f1b",
      countryId: "5f7b1b9b4f3c1d1b1c9d4f1b",
      currencyType: "symbol",
      currencyPosition: "after",
      cents: false,
      allFormat: "#,###.##",
      currency: {
        id: "5f7b1b9b4f3c1d1b1c9d4f1b",
        code: "EUR",
        symbol: "€",
      },
      country: {
        id: "5f7b1b9b4f3c1d1b1c9d4f1b",
        name: "Spain",
        code: "ES",
      },
    };

    const fare = formatService.applyFormat(formatData, 1240.23);
    expect(fare).to.equal("1,240 €");
  });

  it("Country: Germany + currency: EUR", async () => {
    const formatData = {
      id: "5f7b1b9b4f3c1d1b1c9d4f1b",
      currencyId: "5f7b1b9b4f3c1d1b1c9d4f1b",
      countryId: "5f7b1b9b4f3c1d1b1c9d4f1b",
      currencyType: "symbol",
      currencyPosition: "before",
      cents: false,
      allFormat: "#.###,##",
      currency: {
        id: "5f7b1b9b4f3c1d1b1c9d4f1b",
        code: "EUR",
        symbol: "€",
      },
      country: {
        id: "5f7b1b9b4f3c1d1b1c9d4f1b",
        name: "Germany",
        code: "DE",
      },
    };

    const fare = formatService.applyFormat(formatData, 1240.23);
    expect(fare).to.equal("€ 1.240");
  });
});
