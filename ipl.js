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
         matchesWonByTeams[obj.winner]++;
       } else {
         matchesWonByTeams[obj.winner] = 1;
       }
     });
     console.log(matchesWonByTeams);
   }
 };






// csv().fromFile(csvDeliveriesPath).then(function(jsonObj) {
//     fs.writeFileSync('iplDeliveries.json', JSON.stringify(jsonObj), function() {
//       let iplDeliveriesObj = JSON.parse(fs.readFileSync('iplDeliveries.json', 'utf8'));
//     });
// });











