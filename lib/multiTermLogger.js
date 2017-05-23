const blessed = require('blessed');
const Joi = require('joi');
const Logger = require("./logger");

const constructorSchema = {
	amount: Joi.number().required(),
	progressbar: Joi.boolean()
}

class MultiTermLogger {
	constructor(options) {
		let validator = Joi.validate(options, constructorSchema);
		if(validator.error !== null){
			throw validator.error;
		}
		this.loggerAmount = options.amount;

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

	err(str, loggerId){
		this.log(`{red-fg}Error: ${str}{/red-fg}`, loggerId)
	}

	log(str, loggerId){
		if(typeof str !== "string" || typeof loggerId !== "number"){
			this.err("Avalid args given", 0);
			return;
		}

		if(loggerId >= this.loggerAmount){
			this.err(`The logger ${loggerId} doesnt exist`, 0);
			return;
		}
		//console.log(this.loggers);
		this.loggers[loggerId].log(str);
	}
}

module.exports = MultiTermLogger;
