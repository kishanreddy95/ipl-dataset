let expect = require('chai').expect;
const functionModules = require('../ipl');

describe('testMatches', function () {

    describe('matchesWonByTeamOverral', function () {
        it('Should return "2008": 1 as the result', function () {
            let test = [{
                "id": "66",
                "season": "2008",
            }];
            expect(functionModules.getMatchesPerYear(test)).to.deep.equal([
                ['2008', 1]
            ]);
        });
    });

    describe('matchesWonByTeamPerSeason', function () {
        it('Should return {"seasons": ["2008"], "teams": [ {"name": "Sunrisers Hyderabad","matches": [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]}]}', function () {
            let test = [{
                "id": "1",
                "season": "2008",
                "winner": "Sunrisers Hyderabad",
            }];
            expect(functionModules.matchesWonOfAllTeams(test)).to.deep.equal({
                seasons: ['2008'],
                teams: [{
                    name: 'Sunrisers Hyderabad',
                    data: [1]
                }]
            });

        });
    });

    describe('extraRunsConceded', function () {
        it('Should return [["Royal Challengers Bangalore", 2]]', function () {
            let testOne = [{
                "id": "1",
                "season": "2016",
            }];

            let testTwo = [{
                "match_id": 1,
                "bowling_team": "Royal Challengers Bangalore",
                "extra_runs": 2
            }];

            let testThree = [{
                "id": "1",
                "season": "2015"
            }];

            expect(functionModules.extraRunsConceded(testOne, testTwo)).to.deep.equal([
                ["Royal Challengers Bangalore", 2]
            ]);

            expect(functionModules.extraRunsConceded(testThree, testTwo)).to.deep.equal([]);
        })
    })
});