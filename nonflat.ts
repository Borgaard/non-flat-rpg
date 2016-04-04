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
function ERRORWRITER3000(errorMsg: string): void{
    readline.cursorTo(process.stdout, 0,22)
    console.error(errorMsg+"        ");
}

type Direction = "left" | "right" | "up" | "down";

class Player {
    symbol: string;
    health: number;
    x: number;
    y: number;
    constructor() { 
        this.symbol = ansi.red+"@";
        this.health = 10;
        this.y = 10
        this.x = 10
    }
    left(map: WorldMap): void{
        let leftTile = (this.x -1)+"_"+this.y;
        ERRORWRITER3000(leftTile);
        if (map[leftTile].walkable == true){
            this.x--;
        }
    }
    right(map: WorldMap): void{
        let rightTile = (this.x +1)+"_"+this.y;
        ERRORWRITER3000(rightTile);
        if (map[rightTile].walkable == true){
            this.x++;
        }
    }
    up(map: WorldMap): void{
        let upTile = this.x+"_"+(this.y -1);
        ERRORWRITER3000(upTile);
        if (map[upTile].walkable == true){
            this.y--;
        }
    }
    down(map: WorldMap): void{
        let downTile = this.x+"_"+(this.y +1);
        ERRORWRITER3000(downTile);
        if (map[downTile].walkable == true){
            this.y++;
        }
    }
    toString(map: WorldMap){
        return this.symbol;
    }

}
var pLayer = new Player();

interface Tile {
    health: number;
    walkable: boolean;
    symbol: string;
}

// environment:
class Grass implements Tile {
    health: number;
    walkable: boolean;
    symbol: string;
    constructor() {
        this.toString = function() {
            return this.symbol;
        }
        this.health = 5;
        this.walkable = true;
        this.symbol = ansi.green+ansi.bold;
        var grassType = Math.random(); 
        if (grassType < 0.33) {
            this.symbol += ".";
        } 
        else if (grassType < 0.66) {
            this.symbol += ",";
        }
        else {
            this.symbol += "\"";
        }
    }

}

class Trees implements Tile {
    health: number
    walkable: boolean;
    symbol: string;
    constructor() {
        this.health = 5;
        this.walkable = false;
        this.symbol = ansi.green+"♣";
    }
    toString(){
        return this.symbol;
    }
}
//immovable, unbreakable. boulders "σ" in future version(post-jan17.2015) will enable crafting on the hard surface.
class Rocks implements Tile {
    health: number;
    walkable: boolean;
    symbol: string;
    constructor() {
        this.health = 5;
        this.walkable = false;
        this.symbol = ansi.gray;
        var rockType = Math.random();
        if (rockType < 0.25) {
            this.symbol += "∞";
        }
        else if (rockType < 0.50) {
            this.symbol += "σ";
            // if (rockType === "σ") { //when player moves against boulder, enable and print crafting bench.
            //   this.craft = true
            // }
        }
        else if (rockType < 0.75) {
            this.symbol += "°";
        }
        else if (rockType < 0.90) {
            this.symbol += "%";
        }
        else {
            this.symbol += "º";
        }
    }

    toString() {
        return this.symbol;
    }
}

class Dirt implements Tile {
    health: number;
    walkable: boolean;
    symbol: string;
    constructor() {
        this.health = 5;
        this.walkable = true;
        this.symbol = ansi.yellow+"#";
    }
    toString() {
        return this.symbol;
    }
}

class Water implements Tile {
    health: number
    walkable: boolean;
    symbol: string;
    constructor() {
        this.health = 5;
        this.walkable = false;
        this.symbol = ansi.blue;
        var waterType = Math.random();
        if (waterType < .33) {
            this.symbol += "░";
        }
        else if (waterType < .66) {
            this.symbol += "▒";
        }
        else {
            this.symbol += "▓";
        }
    }
    toString() {
        return this.symbol;
    }
}

// when map is generated, creates tiles in pre-determined percentages
function generateTile(): Tile {
    var tileType = Math.random();
    if (tileType < .70){
        return new Grass();
    }
    else if (tileType < .75){
        return new Trees();
    }
    else if (tileType < .80){
        return new Rocks();
    }
    else if (tileType < .90){
        return new Water();
    }
    else {
        return new Dirt();
    }

}
interface WorldMap {
    [index: string]: Tile;
}

interface Drawable { 
    draw(): void;
}

var map: WorldMap = {
//Board
}

function draw(map: WorldMap): undefined {
    readline.cursorTo(process.stdout, 0,0);
    var xCorn = pLayer.x -10; //xCorn = corner. I am not a clever namer.
    var yCorn = pLayer.y -10;
    for (var yCounter = yCorn; yCounter < 20+yCorn; yCounter++) {
        var row: Array<Tile | Player> = [];
        for (var xCounter = xCorn; xCounter < 20+xCorn; xCounter++) {
            if (pLayer.x == xCounter && pLayer.y == yCounter){
                row.push(pLayer);
            }
            else {
                var currentTile = xCounter+"_"+yCounter;
                if (currentTile in map){
                    row.push(map[currentTile]);
                }
                else {
                    var newTile = generateTile();
                    row.push(newTile);
                    map[currentTile] = newTile;
                }
            }
        }
        console.log(row.join(" ")+ansi.reset);
    }
}

for (var yCounter = 0; yCounter < 20; yCounter++) {
    var row: Tile[] = [];
    for (var xCounter = 0; xCounter < 20; xCounter++) {
        var newTile = generateTile();
        row.push(newTile);
        var coordinates = yCounter+"_"+xCounter;
        map[coordinates] = newTile;
    }
    console.log(row.join(" ")+ansi.reset);
}
// console.log(map); to print something ridiculous, but somewhat useful I guess if you're a tyrant

process.stdin.on('keypress',function(ch: string, key: {name: Direction}){

    if (key.name == "left" || key.name == "right" || key.name == "up" || key.name == "down"){
        pLayer[key.name](map)
        draw(map);
    }
})















