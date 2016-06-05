var API_URL = 'http://127.0.0.1:8000/api';
document.getElementById('loading').style.visibility = 'hidden';

var json = [{"company": "lyft", "display_name": "Lyft Line", "eta_seconds": 120},
	{"company": "lyft", "display_name": "Lyft", "eta_seconds": 120},
	{"company": "lyft", "display_name": "Lyft Plus", "eta_seconds": 480},
	{"company": "uber", "display_name": "uberPOOL", "eta_seconds": 120},
	{"company": "uber", "display_name": "uberX", "eta_seconds": 120},
	{"company": "uber", "display_name": "uberXL", "eta_seconds": 360},
	 {"company": "uber", "display_name": "UberSELECT", "eta_seconds": 180},
	 {"company": "uber", "display_name": "UberBLACK", "eta_seconds": 180},
	 {"company": "uber", "display_name": "UberSUV", "eta_seconds": 180},
	 {"company": "uber", "display_name": "ASSIST", "eta_seconds": 300},
	 {"company": "uber", "display_name": "uberTAXI", "eta_seconds": 360}]
;
var test;

var getData = function() {
  document.getElementById('loading').style.visibility = 'visible';
  var pickup = document.getElementById('autocomplete').value;
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
  //getData();
  var uberType = 'uberPOOL';
  var lyftType = 'Lyft Line';
  show_etas(uberType, lyftType);
  document.getElementById('loading').style.visibility = 'hidden';
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
    document.getElementById('loading').style.visibility = 'hidden';
}