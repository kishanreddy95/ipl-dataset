//JSON Data Generated according to conditions.
module.exports = {
  getMatchesPerYear: function(json) {
     let matchesPerYearObj = {};
     json.forEach(function(obj) {
       if(matchesPerYearObj.hasOwnProperty(obj.season)) {
         matchesPerYearObj[obj.season]++;
       } else {
         matchesPerYearObj[obj.season] = 1;
       }
     });
     return matchesPerYearObj;
   },
   matchesWonOfAllTeams: function(json) {
     let matchesWonByTeams = {};
     json.forEach(function(obj) {
       if(matchesWonByTeams.hasOwnProperty(obj.winner)) {
           matchesWonByTeams[obj.winner].matches[matchesWonByTeams[obj.winner].season.indexOf(obj.season)]++;
       } else {
         matchesWonByTeams[obj.winner] = {};
         matchesWonByTeams[obj.winner].season = [];
         matchesWonByTeams[obj.winner].matches = [];
         let seasons = ["2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"];
         let matchWins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
         matchesWonByTeams[obj.winner].season.push(...seasons);
         matchesWonByTeams[obj.winner].matches.push(...matchWins); 
         matchesWonByTeams[obj.winner].matches[matchesWonByTeams[obj.winner].season.indexOf(obj.season)]++;
       }
     });
     return matchesWonByTeams;
   }
 };














