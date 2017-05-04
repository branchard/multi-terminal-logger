const assert = require('assert');
const MultiTermLogger = require('../lib/multiTermLogger');

describe('MultiTermLogger', function() {
    describe('constructor', function() {
        it('should contruct object with new operator', function() {
            let multiTermLogger = new MultiTermLogger(8);
            assert.equal("object", typeof multiTermLogger);
        });
    });
});
