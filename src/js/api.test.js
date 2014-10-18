var expect = require('chai').expect;
var sinon  = require('sinon');

var api    = require('./api');

describe('api', function () {

    describe('getPokemon', function () {

        beforeEach(function () {
            this.server = sinon.fakeServer.create();
            this.server.autoRespond = true;
            this.validResponse = [
                200,
                { 'Content-Type': 'application/json' },
                JSON.stringify([
                    {
                        number: '#001',
                        name: 'Bulbasaur',
                        types: [
                            'Grass',
                            'Poison'
                        ]
                    },
                    {
                        number: '#004',
                        name: 'Charmander',
                        types: [
                            'Fire'
                        ]
                    },
                ])
            ];
            this.server.respondWith('/pokemon.json', this.validResponse);
        });

        afterEach(function () {
            this.server.restore();
        });

        it('gets the list of pokemon from the server', function (done) {
            api.getPokemon().done(function (pokemon) {
                expect(pokemon.length).to.equal(2);

                expect(pokemon[0].number).to.equal('#001');
                expect(pokemon[0].name).to.equal('Bulbasaur');
                expect(pokemon[0].types.length).to.equal(2);
                expect(pokemon[0].types[0]).to.equal('Grass');
                expect(pokemon[0].types[1]).to.equal('Poison');

                expect(pokemon[1].number).to.equal('#004');
                expect(pokemon[1].name).to.equal('Charmander');
                expect(pokemon[1].types.length).to.equal(1);
                expect(pokemon[1].types[0]).to.equal('Fire');

                done();
            });

        });

    });

});
