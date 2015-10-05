(function() {

    return map;

    ///////////////////
    function town(){
      this.toString = function() {
        return this.symbol;
      }
      this.x = ''
      this.y = ''
      
      this.enter = function() {
        // console.log('You have entered the town.')
        if player.x && player.y === this.x && this.y {
            console.log('You have entered the town.')
        }
      }

      this.walkable = true;
      this.symbol = ansi.purple+ansi.bold;
    }
    function grass(){
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

    function trees(){
        this.toString = function(){
            return this.symbol;
        }
        this.health = 5;
        this.walkable = false;
        this.symbol = ansi.green+"♣";
    }
    //immovable, unbreakable. boulders "σ" in future version(post-jan17.2015) will enable crafting on the hard surface.
    function rocks() {
        this.toString = function() {
            return this.symbol;
        }
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
    function dirt() {
        this.toString = function() {
            return this.symbol;
        }
        this.health = 5;
        this.walkable = true;
        this.symbol = ansi.yellow+"#";
    }

    function water() {
        this.toString = function() {
            return this.symbol;
        }
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

    // when map is generated, creates tiles in pre-determined percentages
    function generateTile() {
        var tileType = Math.random();
        if (tileType < .70){
            return new grass();
        }
        else if (tileType < .75){
            return new trees();
        }
        else if (tileType < .80){
            return new rocks();
        }
        else if (tileType < .90){
            return new water();
        }
        else {
            return new dirt();
        }

    }

    var map = {
    //Board
        draw: function(){
            readline.cursorTo(process.stdout, 0,0);
            var xCorn = pLayer.x -10; //xCorn = corner. I am not a clever namer.
            var yCorn = pLayer.y -10;
            for (var yCounter = yCorn; yCounter < 20+yCorn; yCounter++) {
                var row = [];
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
    }

    for (var yCounter = 0; yCounter < 20; yCounter++) {
        var row = [];
        for (var xCounter = 0; xCounter < 20; xCounter++) {
            var newTile = generateTile();
            row.push(newTile);
            var coordinates = yCounter+"_"+xCounter;
            map[coordinates] = newTile;
        }
        console.log(row.join(" ")+ansi.reset);
    }
})
