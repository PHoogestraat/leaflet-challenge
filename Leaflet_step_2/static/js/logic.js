// test plumbing
console.log("test connection 2")

//**************************************************************************************** */
// Create a map object

var myMap = L.map("map", {
    center: [42.574444444, -92.786666666],
    zoom: 2

  });
  // Create a circle and pass in some initial options ---- for fun
  L.circle([42.574444444, -92.786666666], {
    color: "green",
    fillColor: "green",
    fillOpacity: 0.75,
    radius: 500
  }).addTo(myMap);



  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

//**************************************************************************************** */


// Country data 
var coord = [];

// significant earthquakes past 30 days
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// Perform a GET request to the query URL   **** creates anyonmos function to store json data as data.features
d3.json(queryUrl, function(data) {
  var coord = [];
  console.log(data.features);
  
  //console.log(data.features.geometry.coordinates);
  
  var coord = data.features
  console.log("coord test" + coord);
  console.log(coord);
  //console.log(coord.Feature.properties)
  var canada = Object.values(coord.geometry.coordinates);
  console.log(canada);

  circlePlot(coord);

});

        // var countries = d3.json(queryUrl, function(data) {
        //   console.log(data.features);
        //   //console.log(data.features.geometry.coordinates);    Why does this not generate the percise cordiantes?
        //   console.log(`earthquake: ${countries}`);              // Why does this not produce the same as line 42
        //   console.log(countries);              // Why does this not produce the same as line 42
        //   //circleFeatures(data.features);
        // });










  //**************************************************************************************** */
  // Loop through the cities array and create one marker for each city object

function circlePlot(earthquakeData) {

    console.log(earthquakeData);
    console.log(features.properties);
    //console.log(Object.values(feature));
  
};


    // function circPlot(countries){
    //     for (var i = 0; i < countries.length; i++) {
            
    //         // Conditionals for countries points
    //         var color = "";
    //         if (countries[i].points > 4) {
    //           color = "Red";
    //         }
    //         else if (countries[i].points > 3) {
    //           color = "yellow";
    //         }
    //         else if (countries[i].points > 2) {
    //           color = "blue";
    //         }
    //         else {
    //           color = "white";
    //         }
          
    //         // Add circles to map
    //         L.circle(countries[i].location, {
    //           fillOpacity: 0.75,
    //           color: "white",
    //           fillColor: color,
    //           // Adjust radius
    //           radius: countries[i].points * 1500
    //         }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h1>Points: " + countries[i].points + "</h1>").addTo(myMap);
    //       };
    //};
//};
