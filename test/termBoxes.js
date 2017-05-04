const assert = require('assert');
const TermBoxes = require('../lib/termBoxes');

describe('TermBoxes', function() {
    describe('constructor', function() {
        it('should contruct object with new operator', function() {
            let termBox = new TermBoxes(8);
            assert.equal("object", typeof termBox);
        });
    });
});
