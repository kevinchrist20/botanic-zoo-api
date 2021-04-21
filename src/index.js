let axios = require('axios')
let cheerio = require('cheerio')

// const animalUrl = 'https://animals.fandom.com/wiki/'
const animalUrl = 'https://www.a-z-animals.com/animals/'
const plantUrl = ''

axios
    .get(animalUrl + "lion")
    .then(response => {
        let $ = cheerio.load(response.data)
        var factsBox = $('body').find('div.row.animal-facts-box')        
        var classification = $(factsBox).find('dl.row.animal-facts')
        var locations = $(factsBox).children('.col-lg-6').next()
        var facts = $(factsBox).find('.col-lg-8 dl.row')

        // $(facts).each((i, ele) => {
        //     console.log($(ele).text())
        // })

        $(facts).children().each((i, ele) => {
            console.log($(ele).text())
        })

        // Locations
        // $(locations).find('ul li').each((i, ele) => {
        //     console.log($(ele).text())
        // })

        // Classifications
        // $(classification).children().each((i, ele) => {
        //     var key = $(ele).filter('dt').text()
        //     var value = $(ele).filter('dd').text()
        //     console.log(`${key} ${value}`)
        // })

    }).catch(err => console.log(err))