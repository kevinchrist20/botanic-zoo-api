# 🦁 Botanic Zoo API 🍓
[![NPM](https://nodei.co/npm/botanic-zoo-api.png)](https://www.npmjs.com/package/botanic-zoo-api)

Using Nodejs, Axios, and Cheerio, this app scrapes animal and plant facts from the web.

## Features
- Get animal info and facts
- Get list of pets(Dog, Cat, etc.)
- Get plant info and facts
- Developer API

## 
Botanic Zoo is free to use without cost.

## 📦 Installation
```
npm i botanic-zoo-api
```

## 📝 Usage
```js
const animal = require('botanic-zoo-api')
animal
  .then(response => console.log(response))
  .catch(err => console.error(err))
```

## Sites Used
- [AZ Animals](https://a-z-animals.com/)
