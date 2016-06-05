var API_URL = 'http://127.0.0.1:8000/api';


var getData = function() {
  var pickup = document.getElementById('pickup').value;
  d3.json(API_URL, function(error, data) {
      console.log(data);
      d3.select('#results').html(JSON.stringify(data, null, 4));
    })
   .header("Content-Type","application/json")
   .send("POST", JSON.stringify({address: pickup}));
}

d3.select("#address").on("submit", function() {
  console.log('test');
  d3.event.preventDefault();
  getData();
});

var uberTypeSelect = d3.select('#uber-type select');
var lyftTypeSelect = d3.select('#lyft-type select');

uberTypeSelect.on('change', function(d) {
    var uberType = d3.select(this).property('value');
    var lyftType = lyftTypeSelect.property('value');

    onDataChange(uberType, lyftType);
});

uberTypeSelect.on('change', function(d) {
    var lyftType = d3.select(this).property('value');
    var uberType = uberTypeSelect.property('value');

    onDataChange(uberType, lyftType);
});

var onDataChange = function(uberType, lyftType){
    'use strict';
    console.log('change data');
}