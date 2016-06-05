

json = [{"company": "lyft", "display_name": "Lyft Line", "eta_seconds": 120},
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


 // static/js/script.js
var API_URL = 'http://localhost:8000/api/eta';

// Attach a submit handler to the form
$( "#address" ).submit(function( event ) {

  // Stop form from submitting normally
  event.preventDefault();

  // Get some values from elements on the page:
  //var $form = $( this ),
  //  term = $form.find( "input[name='s']" ).val(),
  //  url = $form.attr( "action" );

  var term = 'Constitution Ave NW & 10th St NW, Washington, DC'

  // Send the data using post
  var posting = $.post( API_URL, { s: term } );

  // Put the results in a div
  posting.done(function( data ) {
    var content = $( data ).find( "#content" );
    $( "#result" ).empty().append( content );
  });
});


/*

var displayJSON = function(query) {
    d3.json(API_URL + query, function(error, data) {
    // log any error to the console as a warning
    if(error){
    return console.warn(error);
    }
    d3.select('#query pre').html(query);
    d3.select('#data pre').html(JSON.stringify(data, null, 4));
    console.log(data);
    });
};


var query = '/winners?where=' + JSON.stringify({
"year": {"$gt":2000},
"gender": "female"
});



displayJSON(query);

*/