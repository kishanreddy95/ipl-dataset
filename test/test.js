let expect = require('chai').expect;
const functionModules = require('../ipl');

describe('testMatches', function() {

    describe('matchesWonByTeamOverral', function() {
        it('Should return "2008": 1 as the result', function() {
            let result = [{
                "id": "66",
                "season": "2008",
            }];
            expect(functionModules.getMatchesPerYear(result)).to.deep.equal({"2008": 1});
        });
    });

    describe('matchesWonByTeamPerSeason', function() {
        it('Should return {"seasons": ["2008"], "teams": [ {"name": "Sunrisers Hyderabad","matches": [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]}]}', function() {
          let result = [{
            "id": "1",
            "season": "2008",
            "city": "Hyderabad",
            "date": "2017-04-05",
            "team1": "Sunrisers Hyderabad",
            "team2": "Royal Challengers Bangalore",
            "toss_winner": "Royal Challengers Bangalore",
            "toss_decision": "field",
            "result": "normal",
            "dl_applied": "0",
            "winner": "Sunrisers Hyderabad",
            "win_by_runs": "35",
            "win_by_wickets": "0",
            "player_of_match": "Yuvraj Singh",
            "venue": "Rajiv Gandhi International Stadium, Uppal",
            "umpire1": "AY Dandekar",
            "umpire2": "NJ Llong",
            "umpire3": ""
            }];

            expect(functionModules.matchesWonOfAllTeams(result)).to.deep.equal(
                {   "seasons": ["2008"],
                    "teams": [{
                        "name": "Sunrisers Hyderabad",
                        "matches": [1]}]
                });
            });
        });
});