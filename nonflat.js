/* 2D sandbox/exploration game.
grass .," 50% walkable
trees ♣ 20% non-walkable
rocks ∞σ°%º 5% non-walkable
water ░▒▓ 20% non-walkable
dirt # 5% walkable

first step: function for each tile type - COMPLETE
second step: generateTile function to use pre-determined tile spawning percentages
third: ANSI!

in Terminal, use
.load filename.js
new grass();
generateTile();
*/
var requirejs = require('requirejs');

requirejs.config({
    // nodeRequire: require
    paths: {
      town: 'lib/town',
      player: 'lib/player',
      map: 'lib/map',
      game: 'lib/game'
    }
})

requirejs(['map', 'player', 'town', 'game'],
function (map, player, town, game) {
    console.log(town);
    var keypress = require("keypress");
    var ansi = require("simple-ansi");
    keypress(process.stdin);
    // process.stdin begins emitting keypress events
    var readline = require("readline"); //readline part of node API, allows interaction with terminal
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    readline.cursorTo(process.stdout, 0,0);
    readline.clearScreenDown(process.stdout);
    function ERRORWRITER3000(errorMsg){
        readline.cursorTo(process.stdout, 0,22)
        console.error(errorMsg+"        ");
    }
    // console.log(map); to print something ridiculous, but somewhat useful I guess if you're a tyrant

    // Towns!

    process.stdin.on('keypress',function(ch, key){

        if (key.name == "left" || key.name == "right" || key.name == "up" || key.name == "down"){
            pLayer[key.name](map)
            map.draw();
        }
    })
})
