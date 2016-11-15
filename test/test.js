/**
 * Created by kylel on 11/14/2016.
 */
var mocha = require('mocha');
var assert = require('assert');

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });
});