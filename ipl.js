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
         if(matchesWonByTeams[obj.winner].season.indexOf(obj.season) != -1) {
           matchesWonByTeams[obj.winner].matches[matchesWonByTeams[obj.winner].season.indexOf(obj.season)]++;
         } else {
          matchesWonByTeams[obj.winner].season.push(obj.season);
          matchesWonByTeams[obj.winner].matches.push(1);
         }
       } else {
         matchesWonByTeams[obj.winner] = {};
         matchesWonByTeams[obj.winner].season = [];
         matchesWonByTeams[obj.winner].matches = [];
         matchesWonByTeams[obj.winner].season.push(obj.season);
         matchesWonByTeams[obj.winner].matches.push(1); 
       }
     });
     for(let obj in matchesWonByTeams) {
       if(matchesWonByTeams[obj].season[0] == "2017") {
        let season = matchesWonByTeams[obj].season.shift();
        let match = matchesWonByTeams[obj].matches.shift();
        matchesWonByTeams[obj].season.push(season);
        matchesWonByTeams[obj].matches.push(match);
     }
    }
     return matchesWonByTeams;
   }
 };














