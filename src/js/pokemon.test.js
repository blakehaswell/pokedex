var expect  = require('chai').expect;

var pokemon = require('./pokemon');

describe('pokemon', function () {

    describe('filterByTypes', function () {

        it('returns the pokemon which have the types provided', function () {
            var pokemonList = [
                { name: 'Bulbasaur', types: [ 'Grass', 'Poison' ] },
                { name: 'Charmander', types: [ 'Fire' ] },
                { name: 'Squirtle', types: [ 'Water' ] },
                { name: 'Caterpie', types: [ 'Bug' ] },
                { name: 'Weedle', types: [ 'Bug', 'Poison' ] },
                { name: 'Pidgey', types: [ 'Normal', 'Flying' ] },
                { name: 'Rattata', types: [ 'Normal' ] },
                { name: 'Spearow', types: [ 'Normal', 'Flying' ] }
            ];

            var normals = pokemon.filterByTypes(pokemonList, [ 'Normal' ]);
            expect(normals.length).to.equal(3);
            expect(normals[0].name).to.equal('Pidgey');
            expect(normals[1].name).to.equal('Rattata');
            expect(normals[2].name).to.equal('Spearow');

            var poisons = pokemon.filterByTypes(pokemonList, [ 'Poison' ]);
            expect(poisons.length).to.equal(2);
            expect(poisons[0].name).to.equal('Bulbasaur');
            expect(poisons[1].name).to.equal('Weedle');

            var normalFlyings = pokemon.filterByTypes(
                pokemonList,
                [ 'Normal', 'Flying' ]
            );
            expect(normalFlyings.length).to.equal(2);
            expect(normalFlyings[0].name).to.equal('Pidgey');
            expect(normalFlyings[1].name).to.equal('Spearow');
        });

    });

});
