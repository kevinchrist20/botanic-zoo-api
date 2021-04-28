const expect = require('chai').expect

const getAnimal = require('../src/index').getAnimal

describe('Get Animal Test', () => {
    it('Get an animal by name', () => {
        return getAnimal('lion')
            .then(response => {
                expect(typeof response).to.equal('object')

                expect(response.Kingdom).to.equal('Animalia')
                expect(response.Phylum).to.equal('Chordata')
                expect(response.Class).to.equal('Mammalia')
            })
        })
    })