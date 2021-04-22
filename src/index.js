let axios = require('axios')
let cheerio = require('cheerio')
let textVersion = require('textversionjs')

const ANIMAL_URL = 'https://www.a-z-animals.com/animals/'
const PLANT_URL = ''

const WHITE_SPACE_REGEX = /\s|(\(.*\))/g
const UPPERCASE_REGEX = /(?=[A-Z])/
const VIEW_ANIMAL_REGEX = /(view all .* <a.*?>(.*?)<\/a>)/ig

var styleConfig = {
    linkProcess: function(_, linkText) {
        return linkText
    },
    uIndentionChar: "*",
    oIndentionChar: "-",
	listIndentionTabs: 2
}

var animal = {}

axios
    .get(ANIMAL_URL + "african bush elephant")
    .then(response => {
        let $ = cheerio.load(response.data)
        let factsBox = $('body').find('div.row.animal-facts-box')        
        let animalDetails = $('body').find('div#single-animal-text')

        var classification = $(factsBox).find('dl.row.animal-facts')
        var facts = $(factsBox).find('.col-lg-8 dl.row')
        var physical = $(factsBox).find('.col-lg-4 dl.row')

        var featureKeys = []
        var featureValues = []

        // Classifications
        $(classification).children().each((i, ele) => {
            if($(ele).is('dt')) 
                featureKeys.push($(ele).text().replace(WHITE_SPACE_REGEX, ''))
            else 
                featureValues.push($(ele).text())
        })

        // Facts
        $(facts).find('.col-md-6 .row').children().each((i, ele) => {
            if($(ele).is('dt')) 
                featureKeys.push($(ele).text().replace(WHITE_SPACE_REGEX, ''))
            else 
                featureValues.push($(ele).text())
        })

        // Physical
        $(physical).children().each((i, ele) => {
            if($(ele).is('dt')) 
                featureKeys.push($(ele).text().replace(WHITE_SPACE_REGEX, ""))
            else {
                if($(ele).children().is('ul')) {
                    var colorArray = $(ele).text().split(UPPERCASE_REGEX)
                    featureValues.push(colorArray)
                }
                else featureValues.push($(ele).text())
            }
        })

        var animalDetailsHTML = animalDetails.html().replace(VIEW_ANIMAL_REGEX, "")
        var detailsText = textVersion(animalDetailsHTML, styleConfig)

        featureKeys.forEach((value, idx) => {
            animal[value] = featureValues[idx]
        })
        animal['Description'] = detailsText
        console.log(animal)
    }).catch(err => console.log(err))
