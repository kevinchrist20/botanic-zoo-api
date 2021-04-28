let cheerio = require('cheerio')
let axios = require('axios')
let textVersion = require('textversionjs')

const { WHITE_SPACE_REGEX, UPPERCASE_REGEX, VIEW_ANIMAL_REGEX, styleConfig } = require('./constant')
const { ANIMAL_URL, PLANT_URL } = require('./constant')


const getRequest = async(url) => {
    let response

    try {
        response = await axios(url)
    } catch (error) {
        throw Error(`Failed to fetch result from: ${url}`)
    }

    return response.data
}

async function getAnimal(name) {
    return getRequest(ANIMAL_URL + name)
    .then(response => {
        let animal = {}
        let $ = cheerio.load(response)
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

        return animal
    
    }).catch(err => {
        console.error(err)
    })
}

module.exports = {
    getAnimal
}
