let axios = require('axios')
let cheerio = require('cheerio')
let textVersion = require('textversionjs')

// const animalUrl = 'https://animals.fandom.com/wiki/'
const animalUrl = 'https://www.a-z-animals.com/animals/'
const plantUrl = ''

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
    .get(animalUrl + "lion")
    .then(response => {
        let $ = cheerio.load(response.data)
        let factsBox = $('body').find('div.row.animal-facts-box')        
        let animalDetails = $('body').find('div#single-animal-text')

        var classification = $(factsBox).find('dl.row.animal-facts')
        var locations = $(factsBox).children('.col-lg-6').next()
        var facts = $(factsBox).find('.col-lg-8 dl.row')
        var physical = $(factsBox).find('.col-lg-4 dl.row')

        // $(facts).each((i, ele) => {
        //     console.log($(ele).text())
        // })

        // Facts
        $(facts).find('.col-md-6 .row').children().each((i, ele) => {
            var key = $(ele).filter('dt').text()
            var value = $(ele).filter('dd').text()

            animal[key] = value
        })

        // Physical
        $(physical).children().each((i, ele) => {
            var key = $(ele).filter('dt').text()
            var value = $(ele).filter('dd')

            if($(value).has('ul')) {
                animal[key] = value
                console.log(`${key} ${value}`)
            }
            else 
                animal[key] = value
        })

        // Locations
        $(locations).find('ul li').each((i, ele) => {
            var location = $(ele).text()

            animal['location'] = location
        })

        // Classifications
        $(classification).children().each((i, ele) => {
            var key = $(ele).filter('dt').text()
            var value = $(ele).filter('dd').text()

            animal[key] = value
            // console.log(`${key} ${value}`)
        })

        var animalDetailsHTML = animalDetails.html().replace(/(view all .* <a.*?>(.*?)<\/a>)/ig, "")
        var detailsText = textVersion(animalDetailsHTML, styleConfig)
        animal['description'] = detailsText

        // console.log(detailsText)

    }).catch(err => console.log(err))


    console.log(animal)