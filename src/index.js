let cheerio = require("cheerio");
let axios = require("axios");
let textVersion = require("textversionjs");

const {
  WHITE_SPACE_REGEX,
  UPPERCASE_REGEX,
  VIEW_ANIMAL_REGEX,
  styleConfig,
  ANIMAL_URL_ROOT,
  ANIMAL_URL,
  PETS_ROUTES,
} = require("./constant");

const getRequest = async (url) => {
  let response;

  try {
    response = await axios(url);
  } catch (error) {
    throw Error(`Failed to fetch result from: ${url}`);
  }

  return response.data;
};

async function getPets(petUrl) {
  return await getRequest(petUrl)
    .then((response) => {
      const pet = {};
      const petsList = [];
      const $ = cheerio.load(response);

      const contentBody = $("body");
      const petContent = contentBody.find("section#single-content");

      const petInfo = petContent.find("p").first().text();
      const pets = petContent.find("div.row");

      $(pets)
        .children()
        .each((i, ele) => {
          const petData = {};
          if ($(ele).is("div.at-custom-content-ad")) {
            return;
          }
          petData["Name"] = $(ele).find("h5.card-title").text();
          petData["FunFact"] = $(ele).find("p.card-fun-fact").text();
          petData["ImageUrl"] = $(ele).find("img").attr("src");
          petData["AnimalUrl"] = $(ele).find("a").attr("href");
          petsList.push(petData);
        });

      pet["Info"] = petInfo;
      pet["Pets"] = petsList;

      return pet;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
}

async function getAnimal(name) {
  return getRequest(ANIMAL_URL + name)
    .then((response) => {
      const animal = {};
      const $ = cheerio.load(response);
      const factsBox = $("body").find("div.row.animal-facts-box");
      const animalDetails = $("body").find("div#single-animal-text");

      const classification = $(factsBox).find("dl.row.animal-facts");
      const facts = $(factsBox).find(".col-lg-8 dl.row");
      const physical = $(factsBox).find(".col-lg-4 dl.row");

      const featureKeys = [];
      const featureValues = [];

      // Classifications
      $(classification)
        .children()
        .each((i, ele) => {
          if ($(ele).is("dt"))
            featureKeys.push($(ele).text().replace(WHITE_SPACE_REGEX, ""));
          else featureValues.push($(ele).text());
        });

      // Facts
      $(facts)
        .find(".col-md-6 .row")
        .children()
        .each((i, ele) => {
          if ($(ele).is("dt"))
            featureKeys.push($(ele).text().replace(WHITE_SPACE_REGEX, ""));
          else featureValues.push($(ele).text());
        });

      // Physical
      $(physical)
        .children()
        .each((i, ele) => {
          if ($(ele).is("dt"))
            featureKeys.push($(ele).text().replace(WHITE_SPACE_REGEX, ""));
          else {
            if ($(ele).children().is("ul")) {
              var colorArray = $(ele).text().split(UPPERCASE_REGEX);
              featureValues.push(colorArray);
            } else featureValues.push($(ele).text());
          }
        });

      const animalDetailsHTML = animalDetails
        .html()
        .replace(VIEW_ANIMAL_REGEX, "");
      const detailsText = textVersion(animalDetailsHTML, styleConfig);

      featureKeys.forEach((value, idx) => {
        animal[value] = featureValues[idx];
      });
      animal["Description"] = detailsText;

      return animal;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
}

async function getAnimalOfTheDay() {
  return getRequest(ANIMAL_URL_ROOT)
    .then((response) => {
      const $ = cheerio.load(response);
      const contentSection = $("body").find("section#az_aod-2");
      const contentRow = $(contentSection).find("div.row").last();

      const animalName = $(contentRow).find("h5.card-title").text();
      const animalFunFact = $(contentRow).find("p.card-fun-fact").text();
      const animalImage = $(contentRow).find("img").attr("src");
      const animalLink = $(contentRow).find("a").attr("href");

      return {
        Name: animalName,
        FunFact: animalFunFact,
        ImageUrl: animalImage,
        AnimalUrl: animalLink,
      };
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
}

async function getCatPets() {
  return getPets(PETS_ROUTES.Cat);
}

async function getDogPets() {
  return getPets(PETS_ROUTES.Dog);
}

async function getBirdPets() {
  return getPets(PETS_ROUTES.Bird);
}

async function getFishPets() {
  return getPets(PETS_ROUTES.Fish);
}

async function getRodentPets() {
  return getPets(PETS_ROUTES.Rodent);
}

async function getExoticPets() {
  return getPets(PETS_ROUTES.Exotic);
}

module.exports = {
  getAnimal,
  getAnimalOfTheDay,
  getCatPets,
  getDogPets,
  getBirdPets,
  getFishPets,
  getRodentPets,
  getExoticPets,
};
