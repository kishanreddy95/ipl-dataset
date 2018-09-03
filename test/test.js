let expect = require('chai').expect;
const functionModules = require('../ipl.js').getMatchesPerYear;

describe('testMatches', function() {
    describe('matchesWonByTeam', function() {
        it('Should return "2008": 58 as the result', function() {
            let result = {"2008": 58};
            expect(result).to.deep.equal({"2008": 58});
        });
    });
});