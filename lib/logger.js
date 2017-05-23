const Joi = require('joi');
const blessed = require('blessed');

const constructorSchema = {
	id: Joi.number().required(),
	top: Joi.string().required(),
	left: Joi.string().required(),
	width: Joi.string().required()
}

// temporary
const progBar = false;

class Logger extends blessed.box{
	constructor(options) {
		let validator = Joi.validate(options, constructorSchema, { presence: "required"});
		if(validator.error !== null){
			throw validator.error;
		}

		super({
		    label: `(Worker: ${options.id})`,
		    top: options.top,
		    left: options.left,
		    width: options.width,
		    height: '50%',
		    padding: 0,
		    tags: true,
		    keys: true,
		    mouse: true,
		    border: {
		        type: 'line'
		    }
		})

		this.id = options.id;
		this.currentPercentage = 0;
		this.currentLogLine = 1;

		if(progBar){
			this.percentDisplay = blessed.box({
			    top: 0,
			    left: "center",
			    align: "center",
			    width: 4,
			    height: 1,
			    padding: 0,
			    content: '0%'
			});

			this.progressbar = blessed.progressbar({
			    border: 'line',
			    style: {
			        fg: 'blue',
			        bg: 'default',
			        bar: {
			            bg: 'default',
			            fg: 'blue'
			        },
			        border: {
			            fg: 'default',
			            bg: 'default'
			        }
			    },
			    ch: '█',
			    width: '100%-2',
			    height: 3,
			    top: 0,
			    left: 0,
			    filled: 0
			});

			this.append(this.progressbar);
			this.append(this.percentDisplay);
		}

		this.lineNumbers = blessed.log({
		    top: progBar ? 3 : 0,
		    left: 0,
		    width: 1,
		    height: `100%-${progBar ? 5 : 2}`,
		    padding: 0,
		    tags: true,
			content: "1",
		});

		this.logger = blessed.log({
		    top: progBar ? 3 : 0,
		    left: 1,
		    width: "100%-3",
		    height: `100%-${progBar ? 5 : 2}`,
		    tags: true,
		    keys: true,
		    mouse: true,
		    scrollable: true,
			scrollOnInput: false,
			padding: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			},
		    scrollbar: {
		        ch: ' ',
		        track: {
		            bg: 'grey'
		        },
		        style: {
		            inverse: true
		        }
		    }
		});

		//this.append(this.lineNumbers);
		this.append(this.logger);

		this.log.bind(this);
		this.err.bind(this);
		this.tick.bind(this);
	}

	log(str="\n"){
		//this.lineNumbers.log(`{blue-fg}${this.currentLogLine}{/blue-fg}`);
		this.logger.log(`${str}`);
		//this.currentLogLine++;
	}

	err(str){
		this.log(`{red-fg}Error: ${str}{/red-fg}`)
	}

	tick(){

	}

}

module.exports = Logger;
