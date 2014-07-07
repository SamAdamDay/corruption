Corruption
==========

A game in which you roam around the game's own code, killing viruses and eating 
yin-yangs.


Modifying
---------

Feel free to modify as you wish. The code is unfortunately quite messy. This is
partially by design, since a lot of the visual design of the game is in the code
itself.


Structure
---------

The `index.html` file contains code compiled from the javascript files in the 
`parts` directory. 

The `intro.js` file comes first; then the `statements.js`  file is encoded as a
function (this is a bit funky); finally the `control.js` file gets compressed a
bit. All these pieces are glued together, and then they get wrapped and syntax
highlighted.


Compiling
---------

If you want to compile changes you've made to the files in `parts`, you need to
run `python compiling/compile.py`. The requirements are:
- Python 2.7
- Nodejs
- An internet connection (for using the Google closure compiler)

I've only done this on Linux however; I don't know how well it'll work on other
systems.


License
-------
This projected is under the MIT license.