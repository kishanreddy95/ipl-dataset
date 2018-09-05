//JSON Data Generated according to conditions.
module.exports = {
  getMatchesPerYear: function (json) {
    let matchesPerYearObj = {};
    let arr = [];

    //Creating season along with number of matches played.
    json.forEach(function (matchObj) {
      if (matchesPerYearObj.hasOwnProperty(matchObj.season)) {
        matchesPerYearObj[matchObj.season]++;
      } else {
        matchesPerYearObj[matchObj.season] = 1;
      }
    });

    //Pushing data into an array for getting it in required format.
    for (let match in matchesPerYearObj) {
      arr.push([match, matchesPerYearObj[match]]);
    }
    return arr;
  },
  matchesWonOfAllTeams: function (json) {
    let mainMatchData = {};
    let matchesWonByTeams = {};
    let seasons = {};
    let arr = [];

    //Generate Seasons. 
    json.forEach(function (ipl) {
      if (!seasons.hasOwnProperty([ipl.season])) {
        seasons[ipl.season] = 0;
      }
    });

    //Get seasons as a list of array items.
    let compareSeasons = Object.keys(seasons);

    //Generate team data as per seasons array items.
    json.forEach(function (iplMatch) {
      if (matchesWonByTeams.hasOwnProperty(iplMatch.winner)) {
        matchesWonByTeams[iplMatch.winner].data[compareSeasons.indexOf(iplMatch.season)]++;
      } else {
        matchesWonByTeams[iplMatch.winner] = {};
        matchesWonByTeams[iplMatch.winner].name = iplMatch.winner;
        matchesWonByTeams[iplMatch.winner].data = Object.values(seasons);
        matchesWonByTeams[iplMatch.winner].data[compareSeasons.indexOf(iplMatch.season)]++;
      }
    });

    //Push in the data into an array.
    for (let team in matchesWonByTeams) {
      arr.push(matchesWonByTeams[team]);
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
    jsonMatches.forEach(function (iplMatches) {
      if (iplMatches.season == "2016") {
        matchId.push(parseInt(iplMatches.id));
      }
    });

    //Comparing with the Match Id's and calculating extra runs.
    jsonDeliveries.forEach(function (match) {
      if (matchId.indexOf(parseInt(match.match_id)) != -1) {
        if (extraRuns.hasOwnProperty(match.bowling_team)) {
          extraRuns[match.bowling_team] += parseInt(match.extra_runs);
        } else {
          extraRuns[match.bowling_team] = parseInt(match.extra_runs);
        }
      }
    });

    //Pushing data into an array for getting it in required format.
    for (let team in extraRuns) {
      arr.push([team, extraRuns[team]]);
    }
    return arr;
  },
  economicalBowlers: function (jsonMatches, jsonDeliveries) {
    let matchId = [];
    let bowlersEconomy = {};
    let arr = [];

    //Getting Match Id's for 2015.
    jsonMatches.forEach(function (iplMatches) {
      if (iplMatches.season == "2015") {
        matchId.push(parseInt(iplMatches.id));
      }
    });

    //Comparing with Match Id's and getting bowler's economy.
    jsonDeliveries.forEach(function (match) {
      if (matchId.indexOf(parseInt(match.match_id)) != -1) {
        if (bowlersEconomy.hasOwnProperty([match.bowler])) {
          if (match.wide_runs > 0 || match.noball_runs > 0) {
            bowlersEconomy[match.bowler].runs += parseInt(match.total_runs);
            bowlersEconomy[match.bowler].balls += 0;
          } else {
            bowlersEconomy[match.bowler].runs += parseInt(match.total_runs);
            bowlersEconomy[match.bowler].balls += 1;
          }
        } else {
          bowlersEconomy[match.bowler] = {};
          if (match.wide_runs > 0 || match.noball_runs > 0) {
            bowlersEconomy[match.bowler].runs = parseInt(match.total_runs);
            bowlersEconomy[match.bowler].balls = 0;
          } else {
            bowlersEconomy[match.bowler].runs = parseInt(match.total_runs);
            bowlersEconomy[match.bowler].balls = 1;
          }
        }
      }
    });

    //Calculating Economy
    for (let bowler in bowlersEconomy) {
      let economy = bowlersEconomy[bowler].runs / (bowlersEconomy[bowler].balls / 6);
      arr.push([bowler, parseFloat(economy.toFixed(2))]);
    }

    //Sorting for top 10 Bowlers
    arr.sort(function (a, b) {
      return a[1] - b[1];
    })
    arr.splice(10, arr.length);


    return arr;
  }
};