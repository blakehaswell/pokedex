var contains = require('lodash.contains');
var every    = require('lodash.every');
var partial  = require('lodash.partial');

exports.filterByTypes = function (pokemonList, types) {
    return pokemonList.filter(function (pokemon) {
        var pokemonHasType = partial(contains, pokemon.types);
        return every(types, pokemonHasType);
    });
};
