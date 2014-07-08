// Replace this element with the score and the statement resetting the moved inidicator; duplicate some specific items; duplicate some random items; shuffle the statements; add a load of space; add the player; add a gold piece
eval(s[1]); s.push(s[1],s[1],s[1],s[2],s[2]); for(i=0;i<5;i++){k1=u(r()*(s.length-1));k2=u(r()*(s.length-1));s.splice(k1,0,s[k2]);} for (i=s.length-1;i>0;i--){j=u(r()*(s.length-1));t=s[i];s[i]=s[j];s[j]=t;} b=c(s).split(S);for(i=0;i<140;i++){k=u(r()*(b.length-1));b=b.slice(0,k).concat(b[k]+new Array(u(r()*50+1)).join(S),b.slice(k+1));}s=d(b.join(S)); k=u(r()*(s.length-1));s.splice(k,0,P); b=c(s).split(t=new Array(L).join(S));k=u(r()*(b.length-1));s=d(b.slice(0,k).concat(b[k]+G,b.slice(k+1)).join(t));
// Update the score on the screen
s[0]='score='+f+';z=1';_z=11
// Randomly add a road-block
 if ( r ( ) < 0.1 * Math . pow ( Math . max ( v . UP [ 1 ] , v . DOWN [ 1 ] , v . LEFT [ 1 ] , v . RIGHT [ 1 ] ) / Q , 2 ) ) { b = c ( s ) . split ( t = new Array ( R . length ) . join ( S ) ); k = u ( r ( ) * ( b . length - 2 ) ) ; s = d ( b . slice ( 0 , k ) . concat ( b [ k ] + R  + b [ k + 1 ], b . slice ( k + 2 ) ) . join ( t ) ) ; } _z = 13 
// Move up if the up key is pressed [has defensive armour]
0;for ( i = 0 ; i < ( z && v . UP [ 1 ] / 100 ) ; i ++ ) { b = c ( s ) ; p = b . indexOf ( P ) ; x = p % W ; y = ( p - x ) / W ; y = Math . max ( 0 , y - 1 ) ; m = b [ y * W + x - 1 ] ; if ( m != B ) { if ( /[ÄËÏÖÜ]/ . test( m ) ) { f += J } if ( m == C ) { f += I } t = b . replace ( P , S ) ; s = d ( t . slice ( 0 , y * W + x - 1 ) + P + t . slice ( y * W + x ) ); } } z = z && ! i ; _z = 1;0
// Move down if the down key is pressed [has defensive armour]
0;for ( i = 0 ; i < ( z && v . DOWN [ 1 ] / 100 ) ; i ++ ) { b = c ( s ) ; p = b . indexOf ( P ) ; x = p % W ; y = ( p - x ) / W ; y = Math . min ( Math . ceil ( b . length / W ) - 1 , y + 1 ) ; m = b [ y * W + x + 1 ] ; if ( m != B ) { if ( /[ÄËÏÖÜ]/ . test( m ) ) { f += J } if ( m == C ) { f += I } t = b . replace ( P , S ) ; s = d ( t . slice ( 0 , y * W + x + 1 ) + P + t . slice ( y * W + x + 2 ) ); } } z = z && ! i ; _z = 1;0
// Move left if the left key is pressed [has defensive armour]
0;for ( i = 0 ; i < ( z && v . LEFT [ 1 ] / 100 ) ; i ++ ) { b = c ( s ) . replace ( /\n/g , '' ) ; p = b . indexOf ( P ) ; x = p % W ; y = ( p - x ) / W ; x = Math . max ( 0 , x - 1 ) ; m = b [ y * W + x ] ; if ( m != B ) { if ( /[ÄËÏÖÜ]/ . test( m ) ) { f += J }  if ( m == C ) { f += I } t = b . replace ( P , S ) ; s = d ( t . slice ( 0 , y * W + x ) + P + t . slice ( y * W + x + 1 ) ); } } z = z && ! i ; _z = 1;0
// Move right if the right key is pressed [has defensive armour]
0;for ( i = 0 ; i < ( z && v . RIGHT [ 1 ] / 100 ) ; i ++ ) { b = c ( s ) . replace ( /\n/g , '' ) ; p = b . indexOf ( P ) ; x = p % W ; y = ( p - x ) / W ; x = Math . min ( W - 1 , x + 1 ) ; m = b [ y * W + x ] ; if ( m != B ) { if ( /[ÄËÏÖÜ]/ . test( m ) ) { f += J }  if ( m == C ) { f += I } t = b . replace ( P , S ) ; s = d ( t . slice ( 0 , y * W + x ) + P + t . slice ( y * W + x + 1 ) ); } } z = z && ! i ; _z = 1;0
// Randomly swap two adjacent statements
 if ( r ( ) < 0.004 ) { k = u ( r ( ) * ( s . length - 2 ) ) ; t = s [ k ] ; s [ k ] = s [ k + 1 ] ; s [ k + 1 ] = t } _z = 2 
// Randomly duplicate a statement
 if ( r ( ) < 0.01 ) { k1 = u ( r ( ) * ( s . length - 1 ) ) ; k2 = u ( r ( ) * ( s . length - 1 ) ) ; s . splice ( k1 , 0 , s [ k2 ] ) } _z = 3 
// Randomly duplicate a space
 if ( r ( ) < 0.04 ) { b = c ( s ) . split (  S ) ; k = u ( r ( ) * ( b . length - 2 ) ) ; s = d ( b . slice ( 0 , k ) . concat ( b [ k ] + S , b . slice ( k + 1 ) ) . join ( S ) ) } _z = 4 
// Randomly remove a space
 if ( r ( ) < 0.04 ) { b = c ( s ) . split ( S + S ) ; k = u ( r ( ) * ( b . length - 2 ) ) ; b . splice ( k , 2 , b [ k ] + S + b [ k + 1 ] ) ; s = d ( b . join ( S + S ) ) } _z = 5 
// Randomly add a gold piece
 if ( r ( ) < 0.06 ) { b = c ( s ) . split ( t = new Array ( G . length ) . join ( S ) ); k = u ( r ( ) * ( b . length - 2 ) ) ; s = d ( b . slice ( 0 , k ) . concat ( b [ k ] + G  + b [ k + 1 ], b . slice ( k + 2 ) ) . join ( t ) ) ; } _z = 6 
// Randomly reduce the score
 if ( r ( ) < 0.1 ) { f-- } _z = 7 
// The virus; it self replicates in available space, and eats gold
t='/*'+'*/';if(r()<0.5)s=d(c(s).replace(new RegExp(S+'{177}','m'),t+s[_i]+t));if(r()<0.07)b=c(s).split(C),k=u(r()*(b.length-2)),b.splice(k,2,b[k]+'#'+b[k+1]),s=d(b.join(C));_z=8
// The monster-spawner; it creates umlaut-monsters: /*Ä<Ä*/ /*Ë<Ë*/ /*Ï<Ï*/ /*Ö<Ö*/ /*Ü<Ü*/
 if ( r ( ) < 0.03 ) { b = c ( s ) . split ( t = new Array ( 7 ) . join ( S ) ); if ( b . length > 2 ) { w = [ 'Ä' , 'Ë' , 'Ï' , 'Ö' , 'Ü' ] [ u ( r ( ) * 4 ) ] ; k = u ( r ( ) * ( b . length - 2 ) ) ; s = d ( b . slice ( 0 , k ) . concat ( b [ k ] + '/*' + w + [ '<' , '>' ] [ u ( r ( ) ) ] + w + '*/'  + b [ k + 1 ], b . slice ( k + 2 ) ) . join ( t ) ) ; } } _z = 9 
// The monster-controller; it moves umlaut-monsters left and right
 a1 = '\\/' ; a2 = '\\*' ; t = P + C + a1 + a2 + S + B + 'ÄËÏÖÜ#><' ; s = d ( c ( s ) . replace ( new RegExp ( '([^' + t + '])' + a1 + a2 + '([ÄËÏÖÜ])<[ÄËÏÖÜ]' + a2 + a1 , 'g' ) , '$1/*$2>$2*/' ) . replace ( new RegExp ( '([' + t + '])' + a1 + a2 + '([ÄËÏÖÜ])<[ÄËÏÖÜ]' + a2 + a1 , 'g' ) , '/*$2<$2*/' + S ) . replace ( new RegExp ( a1 + a2 + '([ÄËÏÖÜ])>[ÄËÏÖÜ]' + a2 + a1 + '([^' + t + '])' , 'g' ) , '/*$1<$1*/$2' ) . replace ( new RegExp ( a1 + a2 + '([ÄËÏÖÜ])>[ÄËÏÖÜ]' + a2 + a1 + '([' + t + '])' , 'g' ) , S+'/*$1>$1*/' ) ) ; _z = 10 
// Randomly add an original statement into the screen
 if ( r ( ) < 0.01 ) { s . splice ( u ( r ( ) * ( s . length - 1 ) ) , 0 , o [ u ( r ( ) * ( o . length - 1 ) ) ] ) } _z = 12 
// Randomise the screen if the r key is pressed
 if ( v . R ) { f -= E ; for ( i = s.length - 1 ; i > 0 ; i -- ) { j = u ( r ( ) * ( s . length - 1 ) ) ; t = s [ i ] ; s [ i ] = s [ j ] ; s [ j ] = t } } _z = 14