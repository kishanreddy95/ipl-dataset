const csvPath = "./ipl/matches.csv";
const csv = require('csvtojson');
const fs = require('fs');

let iplObj = {};

csv().fromFile(csvPath).then(function(jsonObj) {

    jsonObj.forEach((val) => {
      if(iplObj.hasOwnProperty(val.season)) {
        iplObj[val.season]++;
      } else {
        iplObj[val.season] = 1;
      }
    });
    console.log(iplObj);
    fs.writeFile('ipl.json', JSON.stringify(iplObj), function() {});

    return jsonObj;
});


// console.log(value);
// function toCreateMatchesPerSeason(jsonObj) {
//   console.log(jsonObj);
// }






