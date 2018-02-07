'use strict';

var expect = require('chai').expect;
var dumbson = require('../index');

describe('stringify', function() {
    const testCases = [
        { name: "John", value: 15 },
        { filter: { type: [1,4,3], color: 'red', size: null }, sort: 'name', page: 0, mode: null },
        { nil: null, num: 1, str: "", eObj: {}, eArr: [], obj: { name: 'Asd'}, arr: [1,2,3] },
        0,
        false,
        true,
        "",
        "A",
        { },
        { name: "Name" },
        [],
        [1],
        [1,2,3],
        [1,,3],
        { name: null }
    ];

    testCases.forEach(function(testCase) {
        it('parse/stringify case ' + JSON.stringify(testCase), function() {

            var serialized = dumbson.stringify(testCase);
            var parsed = dumbson.parse(serialized);       

            var originalJson = JSON.stringify(testCase);
            var processedJson = JSON.stringify(parsed);
            expect(originalJson).to.equal(processedJson);

        })
    });

    const objectTestCases = [
        { filter: { type: [1,4,3], color: 'red', size: null }, sort: 'name', page: 0, mode: null },
        { nil: null, num: 1, str: "", eObj: {}, eArr: [], obj: { name: 'Asd'}, arr: [1,2,3] },
        { },
        { name: "Name" },
        { name: null }
    ];   

    objectTestCases.forEach(function(testCase) {
        it('to/from object case ' + JSON.stringify(testCase), function() {

            var serialized = dumbson.stringifyQuery(testCase);
            var parsed = dumbson.parseQueryString(serialized);       

            var originalJson = JSON.stringify(testCase);
            var processedJson = JSON.stringify(parsed);
            expect(originalJson).to.equal(processedJson);

        })
    });    
});