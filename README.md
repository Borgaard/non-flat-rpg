# non-flat-rpg
Definitely not flat.

![notflat](http://i.imgur.com/2F195Wm.png?1)

Play a 2D sandbox adventure game in your terminal. 

Ensure you have node installed to play. 

* Clone this repo with `git clone https://github.com/Borgaard/non-flat-rpg.git`
* change directory with `cd non-flat-rpg`
* install package dependencies with `npm install --save` [may have to use sudo]
* `node nonflat.js` to begin.

The majority of the world is grass, however rocks and trees are immovable, and you don't want to fall into a pond now, do ya?

Map is currently 20x,20y units (count starts at top left corner, where coords are 0x,0y), and player starts at coordinates -10x,-10y. When player moves left 1 unit, the right side of map view is chopped off by 1 unit. When player moves back, right side is restored. As player adventures, map grows in size.

Next tasks:
* Trees take hit point damage and can be knocked down by repeatedly hitting them (ie if a tree is on your left, hit left a few times).
* Once trees can be pwnd, give user an inventory with a random amount of logs (0-3) for each tree cut down.
* With inventory of logs, player may interact with boulder (uncommon large rock icon: `ō`) to use as a makeshift crafting bench.



