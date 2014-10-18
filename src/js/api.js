var getJson = require('jquery').getJSON;
var q       = require('q');

exports.getPokemon = function () {
    return q(getJson('/pokemon.json'));
};
