var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
    paths: {
        town: 'lib/town',
        player: 'lib/player',
        map: 'lib/map',
        game: 'lib/nonflat'
    }
});

requirejs(['map', 'player', 'town', 'game'],
function   (map, player, town, game) {
    //foo and bar are loaded according to requirejs
    //config, but if not found, then node's require
    //is used to load the module.
    console.log("modules loaded")

});
