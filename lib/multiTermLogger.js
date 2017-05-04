const blessed = require('blessed');
const Logger = require("./logger");

class MultiTermLogger {
	constructor(loggerAmount) {
		this.loggerAmount = loggerAmount;

		this.screen = blessed.screen({
			smartCSR: true
	  	});

		this.screen.title = `Workers: ${this.loggerAmount}`;

		this.loggers = [];

		for (var i = 0; i < this.loggerAmount; i++) {
			let logger = new Logger({
				id: i,
				top: `${i < (this.loggerAmount / 2) ? 0 : 50}%`,
				left: `${(i < (this.loggerAmount / 2)) ? ((100 / (this.loggerAmount / 2)) * i) : ((100 / (this.loggerAmount / 2)) * (i - (this.loggerAmount / 2)))}%`,
				width: `${100 / (this.loggerAmount / 2)}%`
			});
			this.loggers.push(logger);
			this.screen.append(logger);
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

		if(boxId >= this.loggerAmount){
			this.err(`The box ${boxId} doesnt exist`, 0);
			return;
		}
		//console.log(this.loggers);
		this.loggers[boxId].log(str);
	}
}

module.exports = MultiTermLogger;
