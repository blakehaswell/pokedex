var createClass = require('react').createClass;
var dom         = require('react').DOM;

module.exports = createClass({

    render: function () {
        return dom.table(
            null,
            dom.thead(
                null,
                dom.tr(
                    null,
                    dom.th(null, 'Number'),
                    dom.th(null, 'Name'),
                    dom.th(null, 'Types')
                )
            ),
            dom.tbody(
                null,
                this.renderRows()
            )
        );
    },

    renderRows: function () {
        return this.props.pokemonList.map(function (pokemon) {
            return dom.tr(
                {
                    key: pokemon.number,
                    onClick: this.props.onRowClick
                },
                dom.td(null, pokemon.number),
                dom.td(null, pokemon.name),
                dom.td(null, pokemon.types.join(', '))
            );
        }.bind(this));
    }

});
