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
  ScientificName: 'Cryptoprocta ferox',
  Prey: 'Lemurs, Frogs, Lizards',
  NameOfYoung: 'Cub',
  GroupBehavior: 'Solitary',
  FunFact: 'Most closely related to the Mongoose!',
  EstimatedPopulationSize: 'Less than 2,500',
  BiggestThreat: 'Habitat loss',
  MostDistinctiveFeature: 'Webbed toes and retractable claws',
  GestationPeriod: '3 months',
  Habitat: 'Dense tropical forest',
  Predators: 'Human, Crocodile',
  Diet: 'Carnivore',
  Description: 'Fossa Classification and Evolution\n' +
    '----------------------------------\n' +
    '\n' +
    'The Fossa is a medium-sized, carnivorous animal that is found exclusively on the island of Madagascar. The Fossa belongs to the Malagasy Carnivores group which are thought to have descended from Mongoose-like ancestors that arrived on Madagascar from Africa up to 24 million years ago. The Fossa is not only one of the most ancient of the eight species found on the island but it is also the largest, meaning that the Fossa is Madagascar’s largest mammalian predator. However, due to the cat-like appearance of the Fossa it was believed to be a primitive species of feline until recently. Sadly like a number of the unique animal species found in Madagascar today though, the Fossa is incredibly rare and is now considered to be endangered in its natural habitat primarily due to habitat loss.\n' +
    '\n',
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
