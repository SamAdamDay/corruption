
// Listener Object
$l = new window.keypress.Listener();

M = 250; // Miliseconds per frame
W = 200; // The width in characters of the screen
X = 50;  // The maximum number of statements
I = 50; // The increment in score when a gold piece is eaten
D = "/**/"; // Delimiter for separating statements
P = "█"; // The player character
G = "/*☯☯*/"; // The gold string
C = "☯"; // The gold piece
S = " "; //  A single space
L = 6; // The length of the gold string

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
	if ($m) clearInterval($m);
	n.innerHTML = hljs.highlight("javascript","/**************/\n/* Game Over! */\n/**************/\n/* Score: */\ng = "+g+";\n\n/* Press <F5> to play again. /*").value;
}

// Register the key presses with Keypress
$l.register_many([
	{
		"keys": "up", 
		"on_keydown": function() {
			v.UP[0] = true;
			v.UP[1]++;
		},
		"on_keyup": function() {
			v.UP[0] = false;
		}
	},
	{
		"keys": "down", 
		"on_keydown": function() {
			v.DOWN[0] = true;
			v.DOWN[1]++;
		},
		"on_keyup": function() {
			v.DOWN[0] = false;
		}
	},
	{
		"keys": "left", 
		"on_keydown": function() {
			v.LEFT[0] = true;
			v.LEFT[1]+=5;
		},
		"on_keyup": function() {
			v.LEFT[0] = false;
		}
	},
	{
		"keys": "right", 
		"on_keydown": function() {
			v.RIGHT[0] = true;
			v.RIGHT[1]+=5;
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
// In that case, $s is an array saying which statements successed
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
				$f = hljs.highlight("javascript",$f,true).value // Highlight
					.replace(new RegExp(C+C,"g"),"Ö") // Change the double yin-yangs to a control sequence temporarily
					.replace(new RegExp(C,"g"),"<span class='yin-yang-small'>"+C+"</span>") // Pick out the singleton yin-yangs
					.replace(/Ö/g,"<span class='yin-yang-large'>"+C+"</span>"); // Replace the double yin-yangs
				if (!$s[$i]) $f = "<span class='bad-statement'>"+$f+"</span>"; // If an error occurred with this statement, highlight that
			}

			$q.push($f); // Add the statement

			$w = $v;

		}

	}

	return $y?$q.join(hljs.highlight("javascript",D,true).value):$q.join(D);

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
	for ($i=0;$i<3;$i++)
	{
		$k = u(r()*(s.length-1)); 
		s.splice($k,0,s[$k]);
	}

	// Shuffle the statements (Fisher-Yates)
	for ($i=s.length-1;$i>0;$i--)
	{
		$j = u(r()*(s.length-1));
		$t = s[$i]; s[$i] = s[$j]; s[$j] = $t; // Swap $i and $j
	}

	// Add a load of space to start things off
	$b = c(s).split(" ");
	for ($i=0; $i<100; $i++)
	{ 
		$k = u(r()*($b.length-1));
		$b = $b.slice(0,$k).concat($b[$k]+new Array(u(r()*40+1)).join(" "),$b.slice($k+1));
	}
	s = d($b.join(" "));

	// Add the player in a random location
	$b = c(s);
	$k = u(r()*($b.length-1));
	s = d($b.slice(0,$k)+P+$b.slice($k+1));

	// Add a gold piece to a random space
	$b = c(s).split($t = new Array(L).join(" ")); 
	$k = u(r()*($b.length-1));
	s = d( $b.slice(0,$k).concat($b[$k]+G, $b.slice($k+1)).join($t) );

*/

// The array of statements
s = [
	// Replace this element with the score; duplicate some specific items; duplicate some random items; shuffle the statements; add a load of space; add the player; add a gold piece
	"eval(s[1]); s.push(s[1],s[1],s[1]); for (i=0;i<3;i++){k=u(r()*(s.length-1));s.splice(k,0,s[k]);} for (i=s.length-1;i>0;i--){j=u(r()*(s.length-1));t=s[i];s[i]=s[j];s[j]=t;} b=c(s).split(S);for(i=0;i<100;i++){k=u(r()*(b.length-1));b=b.slice(0,k).concat(b[k]+new Array(u(r()*40+1)).join(S),b.slice(k+1));}s=d(b.join(S)); b=c(s);k=u(r()*(b.length-1));s=d(b.slice(0,k)+P+b.slice(k+1)); b=c(s).split(t=new Array(L).join(S));k=u(r()*(b.length-1));s=d(b.slice(0,k).concat(b[k]+G,b.slice(k+1)).join(t));",
	// Update the score on the screen
	"s[0]='score='+f+';'",
	// Move up if the up key is pressed
	" for ( i = 0 ; i < v . UP [ 1 ] / 100 ; i ++ ) { b = c ( s ) ; p = b . indexOf ( P ) ; x = p % W ; y = ( p - x ) / W ; y = Math . max ( 0 , y - 1 ) ; if ( b [ y * W + x + 1 ] == C ) { f += I } t = b . replace ( P , S ) ; s = d ( t . slice ( 0 , y * W + x - 1 ) + P + t . slice ( y * W + x ) ); } ",
	// Move down if the down key is pressed
	" for ( i = 0 ; i < v . DOWN [ 1 ] / 100 ; i ++ ) { b = c ( s ) ; p = b . indexOf ( P ) ; x = p % W ; y = ( p - x ) / W ; y = Math . min ( Math . ceil ( b . length / W ) - 1 , y + 1 ) ; if ( b [ y * W + x + 1 ] == C ) { f += I } t = b . replace ( P , S ) ; s = d ( t . slice ( 0 , y * W + x + 1 ) + P + t . slice ( y * W + x + 2 ) ); } ",
	// Move left if the left key is pressed
	" for ( i = 0 ; i < v . LEFT [ 1 ] / 100 ; i ++ ) { b = c ( s ) . replace ( /\\n/g , '' ) ; p = b . indexOf ( P ) ; x = p % W ; y = ( p - x ) / W ; x = Math . max ( 0 , x - 1 ) ; if ( b [ y * W + x ] == C ) { f += I } t = b . replace ( P , S ) ; s = d ( t . slice ( 0 , y * W + x ) + P + t . slice ( y * W + x + 1 ) ); } ",
	// Move right if the right key is pressed
	" for ( i = 0 ; i < v . RIGHT [ 1 ] / 100 ; i ++ ) { b = c ( s ) . replace ( /\\n/g , '' ) ; p = b . indexOf ( P ) ; x = p % W ; y = ( p - x ) / W ; x = Math . min ( W - 1 , x + 1 ) ; if ( b [ y * W + x ] == C ) { f += I } t = b . replace ( P , S ) ; s = d ( t . slice ( 0 , y * W + x ) + P + t . slice ( y * W + x + 1 ) ); } ",
	// Randomly swap two adjacent statements
	" if ( r ( ) < 0.004 ) { k = u ( r ( ) * ( s . length - 2 ) ) ; t = s [ k ] ; s [ k ] = s [ k + 1 ] ; s [ k + 1 ] = t } ", 
	// Randomly duplicate a statement
	" if ( r ( ) < 0.005 ) { k = u ( r ( ) * ( s . length - 1 ) ) ; s . splice ( k , 0 , s [ k ] ) } ", 
	// Randomly duplicate a space
	" if ( r ( ) < 0.3 ) { b = c ( s ) . split (  S ) ; k = u ( r ( ) * ( b . length - 1 ) ) ; s = d ( b . slice ( 0 , k ) . concat ( b [ k ] + S , b . slice ( k + 1 ) ) . join ( S ) ) } ",
	// Randomly remove a space
	" if ( r ( ) < 0.3 ) { b = c ( s ) . split ( S ) ; k = u ( r ( ) * ( b . length - 2 ) ) ; s = d ( b . slice ( 0 , k ) . concat ( b [ k ] + b [ k + 1 ] , b . slice ( k + 2 ) ) . join ( S ) ) } ",
	// Remove all player characters but the topmost
	" b = c ( s ) ; p = b . indexOf ( P ) ; t = b . replace ( new RegExp ( P , 'g' ) , S ) ; s = d ( b . slice ( 0 , p ) + P + b . slice ( p + 1 ) ) ;",
	// Randomly add a gold piece
	" if ( r ( ) < 0.06 ) { b = c ( s ) . split ( t = new Array ( G . length ) . join ( S ) ); k = u ( r ( ) * ( b . length - 2 ) ) ; s = d ( b . slice ( 0 , k ) . concat ( b [ k ] + G  + b [ k + 1 ], b . slice ( k + 2 ) ) . join ( t ) ) ; }",
	// Randomly reduce the score
	" if ( r ( ) < 0.4 ) { f-- }",
	// The virus; it self replicates in available space, and eats gold
	"t='/*'+'*/';if(r()<0.5)s=d(c(s).replace(/ {157}/m,t+s[_i]+t));if(r()<0.01){b=c(s).split(C);k=u(r()*(b.length-2));b.splice(k,2,b[k]+'#'+b[k+1]);s=d(b.join(C))}"
];


/*
s=[];
for ($i=0;$i<X;$i++)
{
	s.push(new Array(u(r()*500+1)).join(String.fromCharCode($i+33)));
}

$b = c(s);
for ($i=0;$i<100;$i++)
{
	$k = u(r()*($b.length-1));
	$b = $b.slice(0,$k) + G + $b.slice($k);
}
s = d($b);
*/

//s = ["1111111111111111111111/**/111111111111111dfsdfsdfsdfsdfsdf111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111","aaaaaaaaaaaa/*dfsdf*/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"];

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
	$o = []; // An array saying whether each statement succeeded or not
	for (_i in $t)
	{
		$o[_i] = true;
		try { eval($t[_i]); } catch($u) { $o[_i] = false } // Execute the statement, ignoring any errors
	}

	// Update the maximum score
	g=f>g?f:g;

	// Print out the current statements to the screen, highlighting them and inserting newlines as nessecary
	// TODO: Adding \n will sometimes cause keywords not to be highlighted
	n.innerHTML = c(s,true,$o);

	// Release lock
	$e = false;

},M);