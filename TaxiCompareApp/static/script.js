var API_URL = 'http://127.0.0.1:8000/api';

var json;
var test;

var getData = function() {
  var pickup = document.getElementById('pickup').value;
  d3.json(API_URL, function(error, data) {
      console.log(data);
      json = data;
      //d3.select('#results').html(JSON.stringify(data, null, 4));
  })
   .header("Content-Type","application/json")
   .send("POST", JSON.stringify({address: pickup}));
}

var show_etas = function(uberType, lyftType) {
    var uber_results = json.filter(function(d){ return d.company === "uber"})
        .filter(function(d){ return d.display_name === uberType});
    var uber_eta = uber_results[0]['eta_seconds'];
    console.log(uber_eta);

    document.getElementById('eta_uber').innerHTML = uber_eta;

    var lyft_results = json.filter(function(d){ return d.company === "lyft"})
        .filter(function(d){ return d.display_name === lyftType});
    var lyft_eta = lyft_results[0]['eta_seconds'];
    console.log(lyft_eta);

    document.getElementById('eta_lyft').innerHTML = lyft_eta;


   // d3.select('#lyft-eta').html(lyft_eta.stringify(lyft_eta, null, 4));
}

d3.select("#address").on("submit", function() {
  console.log('test');
  d3.event.preventDefault();
  getData();
  var uberType = 'uberPOOL';
  var lyftType = 'Lyft Line';
  show_etas(uberType, lyftType);
});

var uberTypeSelect = d3.select('#uber-type select');
var lyftTypeSelect = d3.select('#lyft-type select');

uberTypeSelect.on('change', function(d) {
    var uberType = d3.select(this).property('value');
    var lyftType = lyftTypeSelect.property('value');

    onDataChange(uberType, lyftType);
});

lyftTypeSelect.on('change', function(d) {
    var lyftType = d3.select(this).property('value');
    var uberType = uberTypeSelect.property('value');

    onDataChange(uberType, lyftType);
});

var onDataChange = function(uberType, lyftType){
    'use strict';
    console.log('change data');
    show_etas(uberType, lyftType);
}