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
Get info and list of different kinds of pets including dogs, cats, birds, rodents, exotic, and fish.

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
    'The Fossa is a medium-sized, carnivorous animal that is found exclusively on the island of Madagascar. The Fossa belongs to the Malagasy Carnivores group which are thought 
    to have descended from Mongoose-like ancestors that arrived on Madagascar from Africa up to 24 million years ago. \n',
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

botanicZoo
  .getCatPets()
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

/* Example output
{
  Info: "The domestic cat (Felis catus) is a small, typically furry, carnivorous mammal. They are often called house cats when kept as indoor pets or simply cats when there is no need to distinguish them from other felids and felines.",
  Pets: [
    {
      Name: 'Harris Hawk',
      FunFact: "Their vision is eight times better than a human's",
      ImageUrl: 'https://a-z-animals.com/media/2021/12/harris-hawk3-300x157.jpg',
      AnimalUrl: 'https://a-z-animals.com/animals/harris-hawk/'
    }
  ]
}
 */
```

## Sites Used

- [AZ Animals](https://a-z-animals.com/)
