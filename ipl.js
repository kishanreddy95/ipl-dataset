//JSON Data Generated according to conditions.
module.exports = {
  getMatchesPerYear: function (json) {
    let matchesPerYearObj = {};
    let arr = [];

    //Creating season along with number of matches played.
    json.forEach(function (obj) {
      if (matchesPerYearObj.hasOwnProperty(obj.season)) {
        matchesPerYearObj[obj.season]++;
      } else {
        matchesPerYearObj[obj.season] = 1;
      }
    });

    //Pushing data into an array for getting it in required format.
    for (let obj in matchesPerYearObj) {
      arr.push([obj, matchesPerYearObj[obj]]);
    }
    return arr;
  },
  matchesWonOfAllTeams: function (json) {
    let mainMatchData = {};
    let matchesWonByTeams = {};
    let seasons = {};
    let arr = [];

    //Generate Seasons. 
    json.forEach(function (obj) {
      if (!seasons.hasOwnProperty([obj.season])) {
        seasons[obj.season] = 0;
      }
    });

    //Get seasons as a list of array items.
    let compareSeasons = Object.keys(seasons);

    //Generate team data as per seasons array items.
    json.forEach(function (obj) {
      if (matchesWonByTeams.hasOwnProperty(obj.winner)) {
        matchesWonByTeams[obj.winner].data[compareSeasons.indexOf(obj.season)]++;
      } else {
        matchesWonByTeams[obj.winner] = {};
        matchesWonByTeams[obj.winner].name = obj.winner;
        matchesWonByTeams[obj.winner].data = Object.values(seasons);
        matchesWonByTeams[obj.winner].data[compareSeasons.indexOf(obj.season)]++;
      }
    });

    //Push in the data into an array.
    for (let val in matchesWonByTeams) {
      arr.push(matchesWonByTeams[val]);
    }

    //Add seasons and the array with team data onto mainMatchData.
    mainMatchData.seasons = compareSeasons;
    mainMatchData.teams = arr;
    return mainMatchData;
  },
  extraRunsConceded: function (jsonMatches, jsonDeliveries) {
    let matchId = [];
    let extraRuns = {};
    let arr = [];

    //Getting Match Id's for 2016.
    jsonMatches.forEach(function (obj) {
      if (obj.season == "2016") {
        matchId.push(parseInt(obj.id));
      }
    });

    //Comparing with the Match Id's and calculating extra runs.
    jsonDeliveries.forEach(function (obj) {
      if (matchId.indexOf(parseInt(obj.match_id)) != -1) {
        if (extraRuns.hasOwnProperty(obj.bowling_team)) {
          extraRuns[obj.bowling_team] += parseInt(obj.extra_runs);
        } else {
          extraRuns[obj.bowling_team] = parseInt(obj.extra_runs);
        }
      }
    });

    //Pushing data into an array for getting it in required format.
    for (let val in extraRuns) {
      arr.push([val, extraRuns[val]]);
    }
    return arr;
  },
  economicalBowlers: function (jsonMatches, jsonDeliveries) {
    let matchId = [];
    let bowlersEconomy = {};
    let arr = [];

    //Getting Match Id's for 2015.
    jsonMatches.forEach(function (obj) {
      if (obj.season == "2015") {
        matchId.push(parseInt(obj.id));
      }
    });

    //Comparing with Match Id's and getting bowler's economy.
    jsonDeliveries.forEach(function (obj) {
      if (matchId.indexOf(parseInt(obj.match_id)) != -1) {
        if (bowlersEconomy.hasOwnProperty([obj.bowler])) {
          if (obj.wide_runs > 0 || obj.noball_runs > 0) {
            bowlersEconomy[obj.bowler].runs += parseInt(obj.total_runs);
            bowlersEconomy[obj.bowler].balls += 0;
          } else {
            bowlersEconomy[obj.bowler].runs += parseInt(obj.total_runs);
            bowlersEconomy[obj.bowler].balls += 1;
          }
        } else {
          bowlersEconomy[obj.bowler] = {};
          if (obj.wide_runs > 0 || obj.noball_runs > 0) {
            bowlersEconomy[obj.bowler].runs = parseInt(obj.total_runs);
            bowlersEconomy[obj.bowler].balls = 0;
          } else {
            bowlersEconomy[obj.bowler].runs = parseInt(obj.total_runs);
            bowlersEconomy[obj.bowler].balls = 1;
          }
        }
      }
    });

    //Calculating Economy
    for (let val in bowlersEconomy) {
      let economy = bowlersEconomy[val].runs / (bowlersEconomy[val].balls / 6);
      arr.push([val, parseFloat(economy.toFixed(2))]);
    }

    //Sorting for top 10 Bowlers
    arr.sort(function (a, b) {
      return a[1] - b[1];
    })
    arr.splice(10, arr.length);


    return arr;
  }
};