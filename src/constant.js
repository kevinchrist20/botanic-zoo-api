const ANIMAL_URL_ROOT = "https://www.a-z-animals.com";
const ANIMAL_URL = `${ANIMAL_URL_ROOT}/animals/`;
const PETS_URL = `${ANIMAL_URL_ROOT}/pets`;
const PLANT_URL = ''

const WHITE_SPACE_REGEX = /\s|(\(.*\))/g
const UPPERCASE_REGEX = /(?=[A-Z])/
const VIEW_ANIMAL_REGEX = /(view all .* <a.*?>(.*?)<\/a>)/ig

const PETS_ROUTES = {
    Dog: `${PETS_URL}/dogs/`,
    Cat: `${PETS_URL}/cats/`,
    Bird: `${PETS_URL}/pet-birds/`,
    Fish: `${PETS_URL}/fish/`,
    Rodent: `${PETS_URL}/pet-rodents/`,
    Exotic: `${PETS_URL}/exotic-pets/`,
}

const styleConfig = {
    linkProcess: function(_, linkText) {
        return linkText
    },
    uIndentionChar: "*",
    oIndentionChar: "-",
	listIndentionTabs: 2
}

module.exports = {
    ANIMAL_URL_ROOT,
    ANIMAL_URL,
    PETS_ROUTES,
    PLANT_URL,
    WHITE_SPACE_REGEX,
    UPPERCASE_REGEX,
    VIEW_ANIMAL_REGEX,
    styleConfig
}