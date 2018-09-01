const csvMatchesPath = "./ipl/matches.csv";
const csvDeliveriesPath = "./ipl/deliveries.csv";
const csv = require('csvtojson');
const fs = require('fs');
const functionModules = require('./ipl.js');

let iplMatchesObj= {};

//Generating a JSON file from csv format
csv().fromFile(csvMatchesPath).then(function(jsonObj) {
    fs.writeFile('./JSON files/iplMatches.json', JSON.stringify(jsonObj), function() {
      iplMatchesObj = JSON.parse(fs.readFileSync('./JSON files/iplMatches.json', 'utf8'));
      fs.writeFileSync('./JSON files/iplMatchesPerYear.json', JSON.stringify(functionModules.getMatchesPerYear(iplMatchesObj)));
    });  
});