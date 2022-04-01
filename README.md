# 🦁 Botanic Zoo API 🍓

[![NPM](https://nodei.co/npm/botanic-zoo-api.png)](https://www.npmjs.com/package/botanic-zoo-api)

Using Nodejs, Axios, and Cheerio, this library scrapes animal and plant facts from the web and produces a json object.

## Features

- Get animal info and facts
- Get list of pets(Dog, Cat, etc.)
- Get animal & plant of the day
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
const botanicZoo = require("botanic-zoo-api");
botanicZoo
  .getAnimal("fossa")
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

/* Example output
{
  Kingdom: 'Animalia',
  Phylum: 'Chordata',
  Class: 'Mammalia',
  Order: 'Carnivora',
  Family: 'Eupleridae',
  Genus: 'Cryptoprocta',
  Description: "Lorem ipsum donor",
  ...
  }
 */

botanicZoo
  .getAnimalOfTheDay()
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

/* Example output
 {
  Name: 'Harris Hawk',
  FunFact: "Their vision is eight times better than a human's",
  ImageUrl: 'https://a-z-animals.com/media/2021/12/harris-hawk3-300x157.jpg',
  AnimalUrl: 'https://a-z-animals.com/animals/harris-hawk/'
  }
 */
```

## Sites Used

- [AZ Animals](https://a-z-animals.com/)
