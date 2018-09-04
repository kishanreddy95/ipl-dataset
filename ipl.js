//JSON Data Generated according to conditions.
module.exports = {
  getMatchesPerYear: function(json) {
     let matchesPerYearObj = {};
     let arr = [];
     json.forEach(function(obj) {
       if(matchesPerYearObj.hasOwnProperty(obj.season)) {
         matchesPerYearObj[obj.season]++;
       } else {
         matchesPerYearObj[obj.season] = 1;
       }
     });
     for(let obj in matchesPerYearObj) {
      arr.push([obj, matchesPerYearObj[obj]]);
    }
     return arr;
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
           matchesWonByTeams[obj.winner].data[compareSeasons.indexOf(obj.season)]++;
       } else {
         matchesWonByTeams[obj.winner] = {};
         matchesWonByTeams[obj.winner].name = obj.winner;
         matchesWonByTeams[obj.winner].data = Object.values(seasons);
         matchesWonByTeams[obj.winner].data[compareSeasons.indexOf(obj.season)]++;
       }
     });

     for(let val in matchesWonByTeams) {
       arr.push(matchesWonByTeams[val]);
     }
     
     mainMatchData.seasons = compareSeasons;
     mainMatchData.teams = arr;

     return mainMatchData;
   },
   extraRunsConceeded: function(jsonMatches, jsonDeliveries) {
    let matchId = [];
    let extraRuns = {};

    jsonMatches.forEach(function(obj) {
      if(obj.season == "2016") {
        matchId.push(obj.id);
      }
    });

    jsonDeliveries.forEach(function(obj) {
      if(extraRuns.hasOwnProperty(obj.bowling_team)) {
        extraRuns[obj.bowling_team] += obj.extra_runs;
      } else {
        if(matchId.indexOf([obj.match_id]) != -1) {
          extraRuns[obj.bowling_team] = obj.extra_runs;
        }
      }
    });

    // console.log(extraRuns);

  
   }
 };

 














