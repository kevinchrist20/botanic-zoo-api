let cheerio = require("cheerio");
let axios = require("axios");
let textVersion = require("textversionjs");

const {
  WHITE_SPACE_REGEX,
  UPPERCASE_REGEX,
  VIEW_ANIMAL_REGEX,
  styleConfig,
  ANIMAL_URL_ROOT,
} = require("./constant");
const { ANIMAL_URL } = require("./constant");

const getRequest = async (url) => {
  let response;

  try {
    response = await axios(url);
  } catch (error) {
    throw Error(`Failed to fetch result from: ${url}`);
  }

  return response.data;
};

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
    });
}

async function getAnimalOfTheDay() {
  return getRequest(ANIMAL_URL)
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
    });
}

module.exports = {
  getAnimal,
  getAnimalOfTheDay,
};
