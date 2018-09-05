const csvMatchesPath = "./ipl/matches.csv";
const csvDeliveriesPath = "./ipl/deliveries.csv";
const csv = require('csvtojson');
const fs = require('fs');
const functionModules = require('./ipl.js');
const path = './public/JSON files';


let iplMatchesObj= {};
let iplDeliveriesObj = {};

//Generating a JSON file from csv format.
csv().fromFile(csvMatchesPath).then(function(jsonObj) {
    fs.writeFile(path+'/iplMatches.json', JSON.stringify(jsonObj), function() {
      iplMatchesObj = JSON.parse(fs.readFileSync(path+'/iplMatches.json', 'utf8'));
      fs.writeFileSync(path+'/iplMatchesPerYear.json', JSON.stringify(functionModules.getMatchesPerYear(iplMatchesObj)));
      fs.writeFileSync(path+'/matchesWonByTeam.json', JSON.stringify(functionModules.matchesWonOfAllTeams(iplMatchesObj)));
    });  
});

csv().fromFile(csvDeliveriesPath).then(function(jsonObj) {
  fs.writeFile(path+'/iplDeliveries.json', JSON.stringify(jsonObj), function() {
    iplDeliveriesObj = JSON.parse(fs.readFileSync(path+'/iplDeliveries.json', 'utf-8'));
    iplMatchesObj = JSON.parse(fs.readFileSync(path+'/iplMatches.json', 'utf8'));
    fs.writeFileSync(path+'/extraRuns.json', JSON.stringify(functionModules.extraRunsConceded(iplMatchesObj, iplDeliveriesObj)));
    fs.writeFileSync(path+'/economicalBowlers.json', JSON.stringify(functionModules.economicalBowlers(iplMatchesObj, iplDeliveriesObj)));
  });
})