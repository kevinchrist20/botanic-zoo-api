const express = require('express')
let cheerio = require('cheerio')
let textVersion = require('textversionjs')

let { WHITE_SPACE_REGEX, UPPERCASE_REGEX, VIEW_ANIMAL_REGEX, styleConfig } = require('./constant')
let { getAnimal } = require('./api')

let app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.get('/api/v1/animal', (req, res, next) => {
    let animalName = req.query.name

    getAnimal(animalName)
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

        res.status(200).json(animal)
    
    })
    .catch(err => {
        res.status(400).json({
            error: "Unable to fetch result"
        })
        console.error(err)
    })
})

app.listen(PORT, console.log(`Listening to Port: ${PORT}`))
