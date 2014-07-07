M = 250; // Miliseconds per frame
W = 200; // The width in characters of the screen
X = 50;  // The maximum number of statements
I = 20; // The increment in score when a gold piece is eaten
J = 30; // The increment in score when an umlaut is eaten
D = "/**/"; // Delimiter for separating statements
P = "█"; // The player character
G = "/*☯☯*/"; // The gold string
C = "☯"; // The gold piece
R = "/*×*/" // The road-block string
B = "×" // The road-block character
S = " "; //  A single space
L = 6; // The length of the gold string
Q = 350; // The maximum speed
A = ";5;"; // The delimiter for the function of statements

f = 0; // The score
g = 0; // The maximum of the score over time

// The status of keys for the current iteration of the main loop (whether they are being pressed or not)
// [isPressed,speed,pressedLastLoop]
v = {
	"UP":[false,0,false], // Up
	"DOWN":[false,0,false], // Down
	"LEFT":[false,0,false], // Left
	"RIGHT":[false,0,false]  // Right
}

// Main loop lock
$e = false;

function w()
{
	// Remove all the non-whitespace characters in a character-wise fashion
	$v = setInterval(function () {
		$b = c(s);
		$c = $b.search(/\S/); // Find the first non-whitespace character
		if ($c != -1)
		{
			$d = new RegExp($b[$c].replace(/([.\\+*?[^$()])/,"\\$1"),"g"); // Need to escape some characters before putting them in the regex
			s = d($b.replace($d," ")); // Replace all instances with " "
		}
		else // If no characters were found, then we're done
		{
			if ($m) clearInterval($m);
			n.innerHTML = 
				"<span class='statement-c-1'>"
				+ hljs.highlight("js","/* ** THE UNIVERSE HAS BEEN CORRUPTED ** */").value.replace("CORRUPTED","<strong>CORRUPTED</strong>")
				+ "</span>"
				+ hljs.highlight("js","   /* Your final score is: */ g = "+g+";   /* Press [F5] to play again. /*").value;
		}
	},50);
}

// Register the key presses with Keypress
$l.register_many([
	{
		"keys": "up", 
		"on_keydown": function() {
			v.UP[0] = true;
			if (v.UP[1]<Q) v.UP[1]++;
		},
		"on_keyup": function() {
			v.UP[0] = false;
		}
	},
	{
		"keys": "down", 
		"on_keydown": function() {
			v.DOWN[0] = true;
			if (v.DOWN[1]<Q) v.DOWN[1]++;
		},
		"on_keyup": function() {
			v.DOWN[0] = false;
		}
	},
	{
		"keys": "left", 
		"on_keydown": function() {
			v.LEFT[0] = true;
			if (v.LEFT[1]<Q) v.LEFT[1]+=5;
		},
		"on_keyup": function() {
			v.LEFT[0] = false;
		}
	},
	{
		"keys": "right", 
		"on_keydown": function() {
			v.RIGHT[0] = true;
			if (v.RIGHT[1]<Q) v.RIGHT[1]+=5;
		},
		"on_keyup": function() {
			v.RIGHT[0] = false;
		}
	},
	{
		"keys": "q",
		"on_keydown": w
	},
	{
		"keys": "backspace",
		"on_keydown": w
	},
	{
		"keys": "escape",
		"on_keydown": w
	}

]);

// Aliases, to shorten code
r = Math.random;
u = Math.round;

// Concatenates statements, wrapping and adding the delimiter
// The optional $y tells the function whether or not it should highlight
// In that case, $s is an array of the background colours of the statements
function c($g,$y,$s)
{

	$y = (typeof $y != "undefined") && $y;

	$w = -1; // Current line length
	$q = []; // The width adjusted statements

	for ($i in $g)
	{

		if ( typeof $g[$i] == "string"  && $g[$i])
		{

			$f = $g[$i]; // The current statement

 			// What the new value of $w will be
			$v = ($w + $f.length) % W;
			if ($v + D.length >= W) {$v = D.length-1;} // The delimiter is a 'block', which sticks together under wrapping
			else $v += D.length;

			if ($w + $f.length + D.length >= W) // If adding the statement causes the line to overflow
			{
				$a = [$f.slice(0,W-$w-1)]; // Get the up to the first offence
				for ($j=0;$j<=Math.floor(($w+$f.length+D.length-W)/W);$j++) // Get the rest of the offenses
				{
					$a.push($f.slice(W-$w-1+$j*W,W-$w-1+($j+1)*W));
				}
				$f = $a.join("\n"); // Add newlines to wrap
			}

			if ($y)
			{
				$f = hljs.highlight("js",$f,true).value // Highlight
					.replace(new RegExp(C+C,"g"),"„÷") // Change the double yin-yangs to a control sequence temporarily
					.replace(new RegExp(C,"g"),"<span class='yin-yang-small'>"+C+"</span>") // Pick out the singleton yin-yangs
					.replace(/„÷/g,"<span class='yin-yang-large'>"+C+"</span>"); // Replace the double yin-yangs
				$f = "<span class='statement-c"+$o[$i]+"'>"+$f+"</span>"; // If an error occurred with this statement, highlight that
			}

			$q.push($f); // Add the statement

			$w = $v;

		}

	}

	return $y?$q.join(hljs.highlight("js",D,true).value):$q.join(D);

}

// Takes a wrapped and delimited screen and returns the corresponding array of elements
function d($h)
{
	return $h.replace(new RegExp("\n","g"),"").split(D);
}

// Return the score in a 'fancy' way
function q()
{
	return "score="+f+";";
}


/* THIS IS WHAT THE FIRST STATEMENT DOES (apart from replacing the first element with the score and duplicating some specific items)

	// Duplicate a few statements
	for ($i=0;$i<5;$i++)
	{
		$k1 = u(r()*(s.length-1)); 
		$k2 = u(r()*(s.length-1)); 
		s.splice($k1,0,s[$k2]);
	}

	// Shuffle the statements (Fisher-Yates)
	for ($i=s.length-1;$i>0;$i--)
	{
		$j = u(r()*(s.length-1));
		$t = s[$i]; s[$i] = s[$j]; s[$j] = $t; // Swap $i and $j
	}

	// Add a load of space to start things off
	$b = c(s).split(" ");
	for ($i=0; $i<140; $i++)
	{ 
		$k = u(r()*($b.length-1));
		$b = $b.slice(0,$k).concat($b[$k]+new Array(u(r()*50+1)).join(" "),$b.slice($k+1));
	}
	s = d($b.join(" "));

	// Add the player in a random location
	$k = u(r()*(s.length-1));
	s.splice($k,0,P);

	// Add a gold piece to a random space
	$b = c(s).split($t = new Array(L).join(" ")); 
	$k = u(r()*($b.length-1));
	s = d( $b.slice(0,$k).concat($b[$k]+G, $b.slice($k+1)).join($t) );

*/

// Determine the array of statements by looking at the contents of the function s(), and using the delimiter A
// A little funky, I know.
o = s = (l + "").slice(14,-1).split(A);

// Main Loop
$m = setInterval(function () {

	// If we haven't finished the previous loop, don't execute this one
	if ($e) return false;

	// Lock
	$e = true;

	// Make sure s has at most X statements (to prevent run-away blow-up)
	while (s.length >= X)
	{
		$k = u(r()*(s.length-1));
		if (s[$k].indexOf(P) == -1)
		{
			s.splice($k,1);
		}
	}

	// Reset the directional speeds if the corresponding button is not being pressed
	for ($i in v)
	{
		if (v[$i][1] > 0) // If the speed is positive
		{
			if (!v[$i][0]) // If the button is not down
			{
				if (v[$i][2]) // There was movement last loop
				{
					v[$i][1] = 0;
					v[$i][2] = false;
				}
				else v[$i][2] = true; // Otherwise, leave the speed as it is, so that there is speed this loop
			}
			else v[$i][2] = true; // Otherwise, we're moving this turn
		}
		else v[$i][2] = false; // Otherwise, it is not pressed this loop
	}

	// Execute all the statements in s
	$t = s; // Make a copy of s to iterate over, as some statments may change the contents of s
	$o = []; // An array of the colours of each statement
	for (_i in $t)
	{
		_c = 0; // The colour of the current statement, may be set by the statement itself
		try { eval($t[_i]); } catch($u) { _c = -1 } // Execute the statement, ignoring any errors
		$o[_i] = _c;
	}

	// Update the maximum score
	g=f>g?f:g;

	// Print out the current statements to the screen, highlighting them and inserting newlines as nessecary
	// TODO: Adding \n will sometimes cause keywords not to be highlighted
	n.innerHTML = c(s,true,$o);

	// Release lock
	$e = false;

},M);