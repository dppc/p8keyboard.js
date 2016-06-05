# p8keyboard.js
Javascript "keyboard adapter" for the [Pico-8](http://www.lexaloffle.com/pico-8.php)

This is a hacktastic way to send ASCII characters to a Pico-8 program running in a browser.

A demo is here: http://dppc.github.io/p8keyboard.js/asciidraw.html (Use arrows to move, spacebar to erase.)

It works by overriding the usual input handling and sending numeric values via controllers 6 and 7.

## To use it in your own project:

+ Add code to your Pico-8 program to handle keyboard input. Something like this (from the demo program):
```lua
kb_chars=" !\"#$%&'()*+,-./0123456789:;<=>?@abcdefghijklmnopqrstuvwxyz[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"
function getchar()
	local n=0
	local i=0
	for i=0,5 do
		if(btn(i,7)) n+=2^i
	end
	if(btn(0,6)) n+=63
	
	if (n==0) return nil
	return sub(kb_chars,n,n)
end
```
+ Put the p8keyboard.js file in the same folder with the .html and .js files exported by Pico-8.

+ Edit the exported .html file, adding `<script type="text/javascript" src="p8keyboard.js"></script>` near the top, like the line before the line containing `<STYLE TYPE="text/css">`. *You'll have to re-do this step after every export.*

