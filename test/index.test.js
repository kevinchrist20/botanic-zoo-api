const expect = require("chai").expect;

const { getAnimal, getAnimalOfTheDay } = require("../src/index");

describe("Get Animal Test", () => {
  it("Get an animal by name", () => {
    return getAnimal("lion").then((response) => {
      expect(typeof response).to.equal("object");

      expect(response.Kingdom).to.equal("Animalia");
      expect(response.Phylum).to.equal("Chordata");
      expect(response.Class).to.equal("Mammalia");
    });
  });

  it("Get animal of the day", () => {
    return getAnimalOfTheDay().then((response) => {
      expect(typeof response).to.equal("object");

      expect(response.Name).to.be.a("string");
      expect(response.FunFact).to.be.a("string");
      expect(response.ImageUrl).to.be.a("string");
      expect(response.AnimalUrl).to.be.a("string");
    });
  });
});
