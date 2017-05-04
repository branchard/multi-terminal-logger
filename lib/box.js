const Joi = require('joi');
const blessed = require('blessed');

const constructorSchema = {
	id: Joi.number().required(),
	top: Joi.string().required(),
	left: Joi.string().required(),
	width: Joi.string().required()
}

class Box extends blessed.box{
	constructor(options) {
		let validator = Joi.validate(options, constructorSchema, { presence: "required"});
		if(validator.error !== null){
			throw validator.error;
		}

		super({
		    label: ` Worker: ${options.id} `,
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

		this.logger = blessed.log({
		    top: 3,
		    left: 0,
		    width: "100%-2",
		    height: '100%-5',
		    padding: 0,
		    tags: true,
		    keys: true,
		    mouse: true,
		    scrollable: true,
		    border: {
		        type: 'line'
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

		this.append(this.progressbar);
		this.append(this.percentDisplay);
		this.append(this.logger);

		this.log.bind(this);
		this.err.bind(this);
		this.tick.bind(this);
	}

	log(str="\n"){
		this.logger.log(`{blue-fg}${this.currentLogLine}{/blue-fg} ${str}`);
		this.currentLogLine++;
	}

	err(str){
		this.log(`{red-fg}Error: ${str}{/red-fg}`)
	}

	tick(){

	}

}

module.exports = Box;
