// JSON Data Generated according to conditions.
module.exports = {
  getMatchesPerYear: (json) => {

    // Creating season along with number of matches played.
    const matchesPerYearObj = json.reduce((ipl, match) => {
      if (match.season in ipl) {
        ipl [match.season] += 1;
      } else {
        ipl[match.season] = 1;
      }
      return ipl;
    }, {});

    let arrOfMatches = Object.keys(matchesPerYearObj).map((key) => {
      return [key, matchesPerYearObj[key]];
    } );

    return arrOfMatches;
  },
  matchesWonOfAllTeams: function (json) {
    const mainMatchData = {};

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

    //Add seasons and the array with team data onto mainMatchData.
    mainMatchData.seasons = compareSeasons;
    mainMatchData.teams = Object.values(matchesWonByTeams);

    return mainMatchData;
  },
  extraRunsConceded: function (jsonMatches, jsonDeliveries) {
    const highChartArr = [];

    //Getting Match Id's for 2016.
    let matchId = jsonMatches.filter((match) => {
        return match.season == "2016";
    }).map(match => parseInt(match.id));

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
    let extraRunArray = Object.keys(extraRuns).map((team) => {
      return [team, extraRuns[team]];
    })
  
    return extraRunArray;
  },
  economicalBowlers: function (jsonMatches, jsonDeliveries) {

    //Getting Match Id's for 2015

    let matchId = jsonMatches.filter((match) => {
      return match.season == "2015";
    }).map((match) => parseInt(match.id));

    //Comparing with Match Id's and getting bowler's economy
    let bowlersEconomy = jsonDeliveries.reduce((bowlers, match) => {
      if (matchId.indexOf(parseInt(match.match_id)) != -1) {
        if (bowlers.hasOwnProperty([match.bowler])) {
          if (match.wide_runs > 0 || match.noball_runs > 0) {
            bowlers[match.bowler].runs += parseInt(match.total_runs);
            bowlers[match.bowler].balls += 0;
          } else {
            bowlers[match.bowler].runs += parseInt(match.total_runs);
            bowlers[match.bowler].balls += 1;
          }
        } else {
          bowlers[match.bowler] = {};
          if (match.wide_runs > 0 || match.noball_runs > 0) {
            bowlers[match.bowler].runs = parseInt(match.total_runs);
            bowlers[match.bowler].balls = 0;
          } else {
            bowlers[match.bowler].runs = parseInt(match.total_runs);
            bowlers[match.bowler].balls = 1;
          }
        }
      }
      return bowlers;
    }, {});

    //Calculating Economy
    let calculateEconomy = Object.keys(bowlersEconomy).map((key) => {
      let economy = bowlersEconomy[key].runs / (bowlersEconomy[key].balls/6);
      let conversion = economy.toFixed(2);
      return [key, parseFloat(conversion)];
    });

    //Getting economical bowlers who have economy below 7
    let economyArr = calculateEconomy.filter(function(bowler) {
      return bowler[1] < 7; 
    });

    return economyArr;
  }
};