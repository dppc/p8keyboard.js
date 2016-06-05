//Javascript "keyboard adapter" for Pico-8.

var pico8_buttons = [0, 0, 0, 0, 0, 0, 0, 0];

var arrowLeft = 0;
var arrowRight = 0;
var arrowUp = 0;
var arrowDown = 0;

//Maps cursor keys to controller 1, as they normally are (but that handler is blocked below).
function updateArrows() {
	pico8_buttons[0] = 0;
	if (arrowLeft > 0) pico8_buttons[0] |= 1;
	if (arrowRight > 0) pico8_buttons[0] |= 2;
	if (arrowUp > 0) pico8_buttons[0] |= 4;
	if (arrowDown > 0) pico8_buttons[0] |= 8;
}

document.addEventListener("keydown", function (e) {
	if (e.keyCode == 37) arrowLeft = 1;
	else if (e.keyCode == 38) arrowUp = 1;
	else if (e.keyCode == 39) arrowRight = 1;
	else if (e.keyCode == 40) arrowDown = 1;
	
	updateArrows();
});

//Sends an index to Pico-8 using controllers 6 & 7.
//The index is into this string of ASCII characters (starting with a space):
// !\"#$%&'()*+,-./0123456789:;<=>?@abcdefghijklmnopqrstuvwxyz[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~
document.addEventListener("keypress", function (e) {
	if (e.charCode < 32) return;
	if (e.charCode < 95) pico8_buttons[7] = (e.charCode - 31);
	else {
		pico8_buttons[6] = 1;
		pico8_buttons[7] = (e.charCode - 94);
	}
});

document.addEventListener("keyup", function (e) {
	if ([37, 38, 39, 40].indexOf(e.keyCode) == -1) {
		pico8_buttons[6] = 0;
		pico8_buttons[7] = 0;
	}
	else {
		if (e.keyCode == 37) arrowLeft = 0;
		else if (e.keyCode == 38) arrowUp = 0;
		else if (e.keyCode == 39) arrowRight = 0;
		else if (e.keyCode == 40) arrowDown = 0;
		
		updateArrows();
	}
});

//This is to prevent the pico-8 generated javascript from eating keydown events (which interferes with the keypress listener).
var originalAddEventListener = document.addEventListener;
function newAddEventListener(){
    if (arguments[0] == "keydown") return;
    else return originalAddEventListener.apply(this, arguments);
};
document.addEventListener = newAddEventListener;
