'use strict';
var greet = require('./greet');

describe('greet', function() { // suite

    it('should greet the given name if name is given', function() { // single test
        expect(greet('Joe')).toEqual('Hello Joe!');
    });

    it('should greet world if no name is given', function() {
        expect(greet()).toEqual('Hello world!');
    });
});