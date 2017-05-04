const TermBoxes = require("../lib");

let someWords = [
	"Bonjour",
	"Hello",
	"Hola",
	"Hallo",
	"Olá",
	"Alo",
	"Ahoj",
	"Ciao",
	"Hej",
	"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
];

let boxAmount = 8;

let termBoxes = new TermBoxes(boxAmount);

for (let i = 0; i < boxAmount; i++) {
	setInterval(function(){
		let randomString = someWords[Math.floor(Math.random() * someWords.length)];

		termBoxes.log(randomString, i)

	}, Math.floor(Math.random() * 2000) + 500);
}
