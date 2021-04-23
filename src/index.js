const express = require('express')
let {animalRequest} = require('request')

let app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.get('api/v1/animal', (req, res, next) => {
    let animal = req.query.name
    animalRequest(animal)
    .then(result => {
        res.status(200).json({
            body: result
        })
    })
    .catch(err => {
        res.status(400).json({
            error: "Unable to fetch result"
        })
        console.error(err)
    })
})

app.listen(PORT, console.log(`Listening to Port:${PORT}`))
