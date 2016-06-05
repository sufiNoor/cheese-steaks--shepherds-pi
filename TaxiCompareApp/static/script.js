var API_URL = 'http://127.0.0.1:8000/api';

d3.select("#address").on("submit", function() {
  d3.event.preventDefault()
  var pickup = document.getElementById('pickup').value;

  d3.json(API_URL, function(error, data) {
      d3.select('#results').html(JSON.stringify(data, null, 4));
    })
   .header("Content-Type","application/json")
   .send("POST", JSON.stringify({address: pickup}));

});