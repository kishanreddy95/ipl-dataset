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
     let mainMatchData = {};
     let matchesWonByTeams = {};
     let seasons = {};
     let arr = [];
     json.forEach(function(obj) {
      if(!seasons.hasOwnProperty([obj.season])) {
        seasons[obj.season] = 0;
      }
     });
     let compareSeasons = Object.keys(seasons);
     
     json.forEach(function(obj) {
       if(matchesWonByTeams.hasOwnProperty(obj.winner)) {
           matchesWonByTeams[obj.winner].matches[compareSeasons.indexOf(obj.season)]++;
       } else {
         matchesWonByTeams[obj.winner] = {};
         matchesWonByTeams[obj.winner].name = obj.winner;
         matchesWonByTeams[obj.winner].matches = Object.values(seasons);
         matchesWonByTeams[obj.winner].matches[compareSeasons.indexOf(obj.season)]++;
       }
     });

     for(let val in matchesWonByTeams) {
       arr.push(matchesWonByTeams[val]);
     }
     
     mainMatchData.seasons = compareSeasons;
     mainMatchData.teams = arr;

     return mainMatchData;
   }
 };














