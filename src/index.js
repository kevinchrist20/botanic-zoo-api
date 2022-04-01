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
const { next } = require("cheerio/lib/api/traversing");

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
  return await getRequest(PETS_ROUTES.Cat)
    .then((response) => {
      const pet = {};
      const characteristics = [];
			const petsList = [];
      const $ = cheerio.load(response);

      const contentBody = $("body");
      const petContent = contentBody.find("section#single-content");

      const petInfo = petContent.find("p").first().text();
      const petCharacteristics = petContent.find("ol");
      const typeOfCoats = petContent.find("h3");
      const pets = petContent.find("div.row");

      const coats = [];
      const coatsContent = [];
      const coatTypes = {};
      $(typeOfCoats).each((i, ele) => {
        coats.push($(ele).text());
        if ($(ele).next().is("p")) {
          coatsContent.push($(ele).next().text());
        }
      });

      $(petCharacteristics)
        .find("li")
        .each((i, ele) => {
          characteristics.push($(ele).text());
        });

      $(pets)
        .children()
        .each((i, ele) => {
					const cat = {};
          if ($(ele).is("div.at-custom-content-ad")) {
            return;
          }
					cat["Name"] = $(ele).find("h5.card-title").text();
					cat["FunFact"] = $(ele).find("p.card-fun-fact").text();
					cat["ImageUrl"] = $(ele).find("img").attr("src");
					cat["AnimalUrl"] = $(ele).find("a").attr("href");
					petsList.push(cat);
        });

      coats.forEach((coat, idx) => {
        coatTypes[coat] = coatsContent[idx];
      });

      pet["Info"] = petInfo;
      pet["Characteristics"] = characteristics;
      pet["Coats"] = coatTypes;
			pet["Pets"] = petsList;

      return pet;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
}

module.exports = {
  getAnimal,
  getAnimalOfTheDay,
  getCatPets,
};
