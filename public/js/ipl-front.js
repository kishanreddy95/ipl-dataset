
let controllers = {
  iplMatchesButton: function () {
    let button = document.querySelector('.ipl-matches-per-season');
    button.addEventListener('click', jsonCalls.iplMatchesPerYear());
  },
  matchesWonByTeamsButton: function () {
    let button = document.querySelector('.matches-won-by-teams');
    button.addEventListener('click', jsonCalls.matchesWonByTeam());
  }
}

let jsonCalls = {
  iplMatchesPerYear: function () {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "../JSON files/iplMatchesPerYear.json", true);

    xhttp.onload = function () {
      if (this.status == "200") {

        let obj = JSON.parse(xhttp.responseText);

        //Inputting to High Charts

        Highcharts.chart('container', {
          chart: {
            type: 'column'
          },
          title: {
            text: 'IPL Data Generation'
          },
          subtitle: {
            text: 'Source:'
          },
          xAxis: {
            type: 'category',
            labels: {
              rotation: -45,
              style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
              }
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Seasons'
            }
          },
          legend: {
            enabled: false
          },
          tooltip: {
            pointFormat: 'Matches in season<b>{point.y:}</b>'
          },
          series: [{
            name: 'Matches',
            data: obj,
            dataLabels: {
              enabled: true,
              rotation: -90,
              color: '#FFFFFF',
              align: 'right',
              format: '{point.y}', // one decimal
              y: 10, // 10 pixels down from the top
              style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
              }
            }
          }]
        });
      }
    }

    xhttp.send();
  },
  matchesWonByTeam: function () {
    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', '../JSON files/matchesWonByTeam.json', true);

    xhttp.onload = function () {
      if (this.status == "200") {

        let obj = JSON.parse(xhttp.responseText);

        //Inputting to High Charts

        Highcharts.chart('container', {
          chart: {
            type: 'bar'
          },
          title: {
            text: 'IPL Data Generation'
          },
          xAxis: {
            categories: obj.seasons
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Matches Won Per Season'
            }
          },
          legend: {
            reversed: true
          },
          plotOptions: {
            series: {
              stacking: 'normal'
            }
          },
          series: obj.teams
        });
      }
    }
    xhttp.send();
  }
}