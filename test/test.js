let expect = require('chai').expect;
const functionModules = require('../ipl');

describe('testMatches', function() {

    describe('matchesWonByTeamOverral', function() {
        it('Should return "2008": 1 as the result', function() {
            let result = [{
                "id": "66",
                "season": "2008",
            }];
            expect(functionModules.getMatchesPerYear(result)).to.deep.equal([['2008', 1]]);
        });
    });

    describe('matchesWonByTeamPerSeason', function() {
        it('Should return {"seasons": ["2008"], "teams": [ {"name": "Sunrisers Hyderabad","matches": [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]}]}', function() {
          let result = [{
            "id": "1",
            "season": "2008",
            "winner": "Sunrisers Hyderabad",
            }];
            console.log(functionModules.matchesWonOfAllTeams(result));
            expect(functionModules.matchesWonOfAllTeams(result)).to.deep.equal(
                {   seasons: ['2008'],
                    teams: [{
                            name: 'Sunrisers Hyderabad',
                            data: [1]
                    }]
                });

            });
        });
});