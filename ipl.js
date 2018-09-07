// JSON Data Generated according to conditions.
module.exports = {
  getMatchesPerYear: (json) => {
    const arrOfMatches = [];

    // Creating season along with number of matches played.
    const matchesPerYearObj = json.reduce((ipl, match) => {
      if (match.season in ipl) {
        ipl [match.season] += 1;
      } else {
        ipl[match.season] = 1;
      }
      return ipl;
    }, {})

    // Pushing data into an array for getting it in required format.
    for (const match in matchesPerYearObj) {
      arrOfMatches.push([match, matchesPerYearObj[match]]);
    }
    return arrOfMatches;
  },
  matchesWonOfAllTeams: function (json) {
    const mainMatchData = {};
    const arr = [];

    // Generate Seasons. 
    let seasons = json.reduce((season, currentMatch) => {
      if(!season.hasOwnProperty(currentMatch.season)){
        season[currentMatch.season] = 0;
      }
      return season;
    },{});

    //Get seasons as a list of array items.
    const compareSeasons = Object.keys(seasons);

    //Generate team data as per seasons array items.
    let matchesWonByTeams = json.reduce((current, iplMatch) => {
      if (current.hasOwnProperty(iplMatch.winner)) {
        current[iplMatch.winner].data[compareSeasons.indexOf(iplMatch.season)]++;
      } else {
        current[iplMatch.winner] = {};
        current[iplMatch.winner].name = iplMatch.winner;
        current[iplMatch.winner].data = Object.values(seasons);
        current[iplMatch.winner].data[compareSeasons.indexOf(iplMatch.season)]++;
      }
      return current;
    }, {});

    // //Push in the data into an array.
    for (const team in matchesWonByTeams) {
      arr.push(matchesWonByTeams[team]);
    }

    //Add seasons and the array with team data onto mainMatchData.
    mainMatchData.seasons = compareSeasons;
    mainMatchData.teams = arr;
    return mainMatchData;
  },
  extraRunsConceded: function (jsonMatches, jsonDeliveries) {
    // const matchId = [];
    // const extraRuns = {};
    const arr = [];

    //Getting Match Id's for 2016.
    let matchId = jsonMatches.reduce((id, iplMatches) => {
      if (iplMatches.season == "2016") {
        id.push(parseInt(iplMatches.id));
      }
      return id;
    },[]);

    //Comparing with the Match Id's and calculating extra runs.
    let extraRuns = jsonDeliveries.reduce((extraRun, match) => {
      if (matchId.indexOf(parseInt(match.match_id)) != -1) {
        if (extraRun.hasOwnProperty(match.bowling_team)) {
          extraRun[match.bowling_team] += parseInt(match.extra_runs);
        } else {
          extraRun[match.bowling_team] = parseInt(match.extra_runs);
        }
      }
      return extraRun
    },{});

    //Pushing data into an array for getting it in required format.
    for (const team in extraRuns) {
      arr.push([team, extraRuns[team]]);
    }
    return arr;
  },
  economicalBowlers: function (jsonMatches, jsonDeliveries) {
    const matchId = [];
    const bowlersEconomy = {};
    const arr = [];

    //Getting Match Id's for 2015.
    jsonMatches.forEach((iplMatches) => {
      if (iplMatches.season == "2015") {
        matchId.push(parseInt(iplMatches.id));
      }
    });

    //Comparing with Match Id's and getting bowler's economy.
    jsonDeliveries.forEach((match) => {
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
    for (const bowler in bowlersEconomy) {
      const economy = bowlersEconomy[bowler].runs / (bowlersEconomy[bowler].balls / 6);
      arr.push([bowler, parseFloat(economy.toFixed(2))]);
    }

    //Sorting for top 10 Bowlers
    arr.sort((a, b) => {
      return a[1] - b[1];
    })
    arr.splice(10, arr.length);


    return arr;
  }
};