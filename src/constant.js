const ANIMAL_URL_ROOT = "https://www.a-z-animals.com";
const ANIMAL_URL = `${ANIMAL_URL_ROOT}/animals/`;
const PLANT_URL = ''

const WHITE_SPACE_REGEX = /\s|(\(.*\))/g
const UPPERCASE_REGEX = /(?=[A-Z])/
const VIEW_ANIMAL_REGEX = /(view all .* <a.*?>(.*?)<\/a>)/ig

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
    PLANT_URL,
    WHITE_SPACE_REGEX,
    UPPERCASE_REGEX,
    VIEW_ANIMAL_REGEX,
    styleConfig
}