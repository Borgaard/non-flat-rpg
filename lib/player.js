(function() {
      this.symbol = ansi.red+"@";
      this.health = 10;
      this.y = 10
      this.x = 10
      this.left = function(map){
          // Why x -1?
          var leftTile = (this.x -1)+"_"+this.y;
          ERRORWRITER3000(leftTile);
          if (map[leftTile].walkable == true){
              this.x--;
          }
      }
      this.right = function(map){
          var rightTile = (this.x +1)+"_"+this.y;
          ERRORWRITER3000(rightTile);
          if (map[rightTile].walkable == true){
              this.x++;
          }
      }
      this.up = function(map){
          var upTile = this.x+"_"+(this.y -1);
          ERRORWRITER3000(upTile);
          if (map[upTile].walkable == true){
              this.y--;
          }
      }
      this.down = function(map){
          var downTile = this.x+"_"+(this.y +1);
          ERRORWRITER3000(downTile);
          if (map[downTile].walkable == true){
              this.y++;
          }
      }
      this.toString = function(map){
          return this.symbol;
      }

  var pLayer = new player();

})
