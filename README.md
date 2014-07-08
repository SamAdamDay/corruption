Corruption
==========

A game in which you roam around the game's own code, killing viruses and eating 
yin-yangs. Play it [here](http://omgwac.com/corruption "Play Corruption").


Modifying
---------

Feel free to modify as you wish. The code is unfortunately quite messy. This is
partially by design, since a lot of the visual design of the game is in the code
itself.


Structure
---------

The `index.html` file contains code compiled from the JavaScript files in the 
`parts` directory. 

The `intro.js` file comes first; then the `statements.js`  file is encoded as a
function (this is a bit funky); finally the `control.js` file gets compressed a
bit. All these pieces are glued together, and then they get wrapped and syntax
highlighted.


Compiling
---------

If you want to compile some changes that you have made to the files in `parts`,
then you'll need to run the command `python compiling/compile.py`. The
requirements are: 
 - Python 2.7 
 - Nodejs 
 - An internet connection (for using the Google closure compiler)

I've only done this on Linux however; I don't know how well it'll work on other
systems.


Useful Info
-----------

I shall call the code that makes up the game-universe the *sub-code*, and the
code that interprets this code the *super-code*.

Variables that are used exclusively by the *super-code* all the `$` prefix. This
is useful to distinguish them, but the main purpose is to protect those
variables from anything the *sub-code* might do, since the sub code never
references any variables beginning with `$`.

Variables created in the *super-code* which for the purpose of communicating
with the *sub-code* have the prefix `_`.


License
-------
This projected is under the MIT license.