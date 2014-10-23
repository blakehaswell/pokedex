var expect = require('chai').expect;
var react  = require('react/addons');
var sinon  = require('sinon');

var pokemonListComponent = require('./pokemon-list');

describe('pokemon list component', function () {

    beforeEach(function () {
        this.element = document.createElement('div');
        document.body.appendChild(this.element);

        var pokemonList = [
            {
                number: '#001',
                name: 'Bulbasaur',
                types: [ 'Grass', 'Poison' ]
            },
            {
                number: '#004',
                name: 'Charmander',
                types: [ 'Fire' ]
            },
            {
                number: '#007',
                name: 'Squirtle',
                types: [ 'Water' ]
            },
            {
                number: '#010',
                name: 'Caterpie',
                types: [ 'Bug' ]
            },
            {
                number: '#013',
                name: 'Weedle',
                types: [ 'Bug', 'Poison' ]
            },
            {
                number: '#016',
                name: 'Pidgey',
                types: [ 'Normal', 'Flying' ]
            },
            {
                number: '#019',
                name: 'Rattata',
                types: [ 'Normal' ]
            },
            {
                number: '#021',
                name: 'Spearow',
                types: [ 'Normal', 'Flying' ]
            }
        ];

        this.onRowClick = sinon.spy();

        react.renderComponent(
            pokemonListComponent({
                pokemonList: pokemonList,
                onRowClick: this.onRowClick
            }),
            this.element
        );
    });

    afterEach(function () {
        react.unmountComponentAtNode(this.element);
        document.body.removeChild(this.element);
    });

    it('renders a table with the pokemon in rows', function () {
        var headingCells =
            this.element.querySelectorAll('table > thead > tr > th');
        expect(headingCells.length).to.equal(3);
        expect(headingCells[0].innerText).to.equal('Number');
        expect(headingCells[1].innerText).to.equal('Name');
        expect(headingCells[2].innerText).to.equal('Types');

        var rows = this.element.querySelectorAll('table > tbody > tr');
        expect(rows.length).to.equal(8);

        var row1Cells = rows[0].querySelectorAll('td');
        expect(row1Cells.length).to.equal(3);
        expect(row1Cells[0].innerText).to.equal('#001');
        expect(row1Cells[1].innerText).to.equal('Bulbasaur');
        expect(row1Cells[2].innerText).to.equal('Grass, Poison');
    });

    describe('when a row is clicked on', function () {

        beforeEach(function () {
            var row = this.element.querySelector('table > tbody > tr');
            react.addons.TestUtils.Simulate.click(row);
        });

        it('calls the passed click handler', function () {
            expect(this.onRowClick.calledOnce).to.be.true;
        });

    });

});
