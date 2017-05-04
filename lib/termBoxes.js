const blessed = require('blessed');
const Box = require("./box");

class TermBoxes {
	constructor(boxAmount) {
		this.boxAmount = boxAmount;

		this.screen = blessed.screen({
		  smartCSR: true
	  	});

		this.screen.title = `Workers: ${this.boxAmount}`;

		this.boxes = [];

		for (var i = 0; i < this.boxAmount; i++) {
			let box = new Box({
				id: i,
				top: `${i < (this.boxAmount / 2) ? 0 : 50}%`,
				left: `${(i < (this.boxAmount / 2)) ? ((100 / (this.boxAmount / 2)) * i) : ((100 / (this.boxAmount / 2)) * (i - (this.boxAmount / 2)))}%`,
				width: `${100 / (this.boxAmount / 2)}%`
			});
			this.boxes.push(box);
			this.screen.append(box);
		}

		// Quit on Escape, q, or Control-C.
		this.screen.key(['escape', 'q', 'C-c'], function(ch, key) {
		  return process.exit(0);
		});

		this.screen.render();

		this.err.bind(this);
		this.log.bind(this);
	}

	err(str, boxId){
		this.log(`{red-fg}Error: ${str}{/red-fg}`, boxId)
	}

	log(str, boxId){
		if(typeof str !== "string" || typeof boxId !== "number"){
			this.err("Avalid args given", 0);
			return;
		}

		if(boxId >= this.boxAmount){
			this.err(`The box ${boxId} doesnt exist`, 0);
			return;
		}
		//console.log(this.boxes);
		this.boxes[boxId].log(str);
	}
}

module.exports = TermBoxes;
