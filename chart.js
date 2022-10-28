// Documentation
// https://developers.google.com/chart/interactive/docs/spreadsheets
// https://developers.google.com/chart/interactive/docs/querylanguage

// Load the Visualization API and the corechart package.
google.charts.load('current', {
  'packages': ['corechart']
});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawGID);
google.charts.setOnLoadCallback(drawChart);

// Set chart options
var pieOptions = {
    legend: {position: 'none'},
    colors: ['#205782', '#da3838'],
    isStacked: true,
    fontName: 'none',
  };
  
  var stackOptions = {
    vAxis: {title: 'Ballots Cast'},
    legend: {position: 'none'},
    colors: ['#205782', '#cccccc', '#da3838'],
    isStacked: true,
    fontName: 'none',
  };

function drawGID() {
// 
  var queryString = encodeURIComponent('limit 36');

// Pull chart data
  var query = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1DVqIEoo3nVBCEaUJDWp9JKcLPnFk18HnvdLMQQrJ314/gviz/tq?sheet=Sheet3&headers=1&tq=' + queryString);
  query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
  
// var pieOptions = {
  //colors:['yellow','#004411'],
  // 'height': 400,
  //'font-family': none
//}

// Instantiate and draw our chart, passing in some options.
  var data = response.getDataTable();
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, pieOptions);
}


// LINES

function drawChart() {  
  var queryString = encodeURIComponent('limit 24 offset 12');

  var query = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1DVqIEoo3nVBCEaUJDWp9JKcLPnFk18HnvdLMQQrJ314/gviz/tq?sheet=Sheet2&headers=1&tq=' + queryString);
  query.send(handleQueryResponse2);
}

function handleQueryResponse2(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }


  
  var data = response.getDataTable();
  var chart = new google.visualization.SteppedAreaChart(document.getElementById('steps_div'));
  chart.draw(data, stackOptions);
}