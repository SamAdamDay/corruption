// Get rid of the space listener, since we won't be needing it anymore
$l.unregister_combo("space");

M = 250; // Miliseconds per frame
W = 200; // The width in characters of the screen
X = 50;  // The maximum number of statements
I = 40; // The increment in score when a gold piece is eaten
J = 20; // The increment in score when an umlaut is eaten
E = 300; // The decrease in score when the screen in randomised
D = "/**/"; // Delimiter for separating statements
P = "█"; // The player character
G = "/*☯☯*/"; // The gold string; if this is changed the corresponding length in statements.js must be changed
C = "☯"; // The gold piece
R = "/*×*/" // The road-block string; if this is changed the corresponding length in statements.js must be changed
B = "×" // The road-block character
S = " "; //  A single space
L = 6; // The length of the gold string
Q = 350; // The maximum speed
A = ";5;"; // The delimiter for the function of statements

f = 0; // The score
$g = 0; // The maximum of the score over time

// The status of keys for the current iteration of the main loop (whether they are being pressed or not)
// [isPressed,speed,pressedLastLoop]
v = {

	"UP":[0,0,0], // Up
	"DOWN":[0,0,0], // Down
	"LEFT":[0,0,0], // Left
	"RIGHT":[0,0,0],  // Right

	"R":0 // r key
}

// Main loop lock
$e = 0;

function $w()
{
	// Remove all the non-whitespace characters in a character-wise fashion
	$z = setInterval(function () {
		$b = $c(s);
		$x = $b.search(/\S/); // Find the first non-whitespace character
		if ($x != -1)
		{
			$r = new RegExp($b[$x].replace(/([.\\+*?[^$()])/,"\\$1"),"g"); // Need to escape some characters before putting them in the regex
			s = $d($b.replace($r," ")); // Replace all instances with " "
		}
		else // If no characters were found, then we're done
		{
			if ($m) clearInterval($m);
			n.innerHTML = 
				"<span class='statement-c-1'>"
				+ hljs.highlight("js","/* ** THE UNIVERSE HAS BEEN CORRUPTED ** */").value.replace("CORRUPTED","<strong>CORRUPTED</strong>")
				+ "</span>"
				+ hljs.highlight("js","   /* Your final score is: */ $g = "+$g+";   /* Press [F5] to play again. /*").value;
			clearInterval($z);
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
		"keys": "r", 
		"on_keydown": function() {
			v.R = true;
		}
	},
	{
		"keys": "q",
		"on_keydown": $w
	},
	{
		"keys": "backspace",
		"on_keydown": $w
	},
	{
		"keys": "escape",
		"on_keydown": $w
	}

]);

// Aliases, to shorten code
r = Math.random;
u = Math.round;

// Concatenates statements, wrapping and adding the delimiter
// The optional $y tells the function whether or not it should highlight
// In that case, $s is an array of the background colours of the statements
// We keep a backup copy, in case c gets overwritten in the game
$c = c = function($v,$y,$s)
{

	$y = (typeof $y != "undefined") && $y;

	$n = -1; // Current line length
	$q = []; // The width adjusted statements

	for ($i in $v)
	{
		if (typeof $v[$i] == "string" && $v[$i])
		{

			$f = $v[$i]; // The current statement

 			// What the new value of $n will be
			$h = ($n + $f.length) % W;
			if ($h + D.length >= W) {$h = D.length-1;} // The delimiter is a 'block', which sticks together under wrapping
			else $h += D.length;

			if ($n + $f.length + D.length >= W) // If adding the statement causes the line to overflow
			{
				$a = [$f.slice(0,W-$n-1)]; // Get the up to the first offence
				for ($j=0;$j<=Math.floor(($n+$f.length+D.length-W)/W);$j++) // Get the rest of the offenses
				{
					$a.push($f.slice(W-$n-1+$j*W,W-$n-1+($j+1)*W));
				}
				$f = $a.join("\n"); // Add newlines to wrap
			}

			if ($y)
			{
				$f = hljs.highlight("js",$f,true).value // Highlight
					.replace(new RegExp(C+C,"g"),"„÷") // Change the double yin-yangs to a control sequence temporarily
					.replace(new RegExp(C,"g"),"<span class='yin-yang-small'>"+C+"</span>") // Pick out the singleton yin-yangs
					.replace(/„÷/g,"<span class='yin-yang-large'>"+C+"</span>"); // Replace the double yin-yangs
				$f = "<span class='statement-c"+$s[$i]+"'>"+$f+"</span>"; // If an error occurred with this statement, highlight that
			}

			$q.push($f); // Add the statement

			$n = $h;

		}

	}

	return $y?$q.join(hljs.highlight("js",D,true).value):$q.join(D);

}

// Takes a wrapped and delimited screen and returns the corresponding array of elements
// We keep a backup copy, in case d gets overwritten in the game
$d = d = function($h)
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

// Determine the array of statements by looking at the contents of the function l(), and using the delimiter A
// A little funky, I know.
o = s = (l + "").slice(14,-1).split(A);

// Main Loop
$m = setInterval(function () {

	// If we haven't finished the previous loop, don't execute this one
	if ($e) return;

	try 
	{

		// Lock
		$e = 1; // true

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
						v[$i][2] = 0; // false
					}
					else v[$i][2] = 1; // true // Otherwise, leave the speed as it is, so that there is speed this loop
				}
				else v[$i][2] = 1; // true // Otherwise, we're moving this turn
			}
			else v[$i][2] = 0; // false // Otherwise, it is not pressed this loop
		}

		// Execute all the statements in s
		$t = s; // Make a copy of s to iterate over, as some statments may change the contents of s
		$o = []; // An array of the colours of each statement
		for (_i in $t)
		{
			_z = 0; // The colour of the current statement, may be set by the statement itself
			try { eval($t[_i]); } catch($u) { console.log($u); _z = -1 } // Execute the statement, ignoring any error
			$o[_i] = _z;
		}

		// Reset the r key
		v.R = 0; // false

		// Update the maximum score
		$g=f>$g?f:$g;

		// Print out the current statements to the screen, highlighting them and inserting newlines as nessecary
		// TODO: Adding \n will sometimes cause keywords not to be highlighted
		n.innerHTML = c(s,1,$o);

	}
	catch ($u) // If there's errors in the above, then really bad things have happened, so end the game
	{
		clearInterval($m);
		$w();
	}

	// Release lock
	$e = 0; // false

},M);