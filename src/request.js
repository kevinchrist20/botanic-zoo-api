let axios = require('axios')
let cheerio = require('cheerio')
let textVersion = require('textversionjs')
let {ANIMAL_URL, PLANT_URL, WHITE_SPACE_REGEX, 
    UPPERCASE_REGEX, VIEW_ANIMAL_REGEX } = require('./constant')

var styleConfig = {
    linkProcess: function(_, linkText) {
        return linkText
    },
    uIndentionChar: "*",
    oIndentionChar: "-",
	listIndentionTabs: 2
}


const getAnimalRequest = async(name) => {
    try {
        const response = await axios(ANIMAL_URL + name)
        return response.data
    } catch (error) {
        throw Error(`Failed to fetch ${name}`)
    }
}



const getAnimal = async(name) => {
    var animal = {}
    const data = getAnimalRequest(name)

    let $ = cheerio.load(data)
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
}

module.exports = {
    getAnimal
}
// axios
//     .get(ANIMAL_URL + "african bush elephant")
//     .then(response => {
//         let $ = cheerio.load(response.data)
//         let factsBox = $('body').find('div.row.animal-facts-box')        
//         let animalDetails = $('body').find('div#single-animal-text')

//         var classification = $(factsBox).find('dl.row.animal-facts')
//         var facts = $(factsBox).find('.col-lg-8 dl.row')
//         var physical = $(factsBox).find('.col-lg-4 dl.row')

//         var featureKeys = []
//         var featureValues = []

//         // Classifications
//         $(classification).children().each((i, ele) => {
//             if($(ele).is('dt')) 
//                 featureKeys.push($(ele).text().replace(WHITE_SPACE_REGEX, ''))
//             else 
//                 featureValues.push($(ele).text())
//         })

//         // Facts
//         $(facts).find('.col-md-6 .row').children().each((i, ele) => {
//             if($(ele).is('dt')) 
//                 featureKeys.push($(ele).text().replace(WHITE_SPACE_REGEX, ''))
//             else 
//                 featureValues.push($(ele).text())
//         })

//         // Physical
//         $(physical).children().each((i, ele) => {
//             if($(ele).is('dt')) 
//                 featureKeys.push($(ele).text().replace(WHITE_SPACE_REGEX, ""))
//             else {
//                 if($(ele).children().is('ul')) {
//                     var colorArray = $(ele).text().split(UPPERCASE_REGEX)
//                     featureValues.push(colorArray)
//                 }
//                 else featureValues.push($(ele).text())
//             }
//         })

//         var animalDetailsHTML = animalDetails.html().replace(VIEW_ANIMAL_REGEX, "")
//         var detailsText = textVersion(animalDetailsHTML, styleConfig)

//         featureKeys.forEach((value, idx) => {
//             animal[value] = featureValues[idx]
//         })
//         animal['Description'] = detailsText
//         console.log(animal)
//     }).catch(err => console.log(err))
