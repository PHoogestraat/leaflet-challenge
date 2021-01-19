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
  }).bindPopup("<center><h3>The Sacred Acer </h3>").addTo(myMap);



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
  

  //console.log(data.features.geometry.coordinates);
  
  var coord = data.features
  console.log("coord test for variable coord");
  console.log(coord);

  testJson(data.features);
  circPlot(data.features);
  //test2Json(data.features);


}); 

function testJson(features){
      console.log(features.length);
      //console.log(features.geometry.place.lenght);
      // console.log("baseline test");
      // console.log(features[0].properties.place); // works

      console.log(`test 1:     ${features[0].properties.place}`);
      console.log(`test 2:    ${features[0].geometry.coordinates}`);
      console.log(`test 2:    ${features[0].properties.mag}`);



      
      
};

  //**************************************************************************************** */
  // Loop through the cities array and create one marker for each city object




function circPlot(features) {
      var popRad =[]
      for (var i = 0; i < features.length; i++) {
          console.log(features.lenght);

          // Conditionals for countries points
          var color = "";
          if (features[i].properties.mag > 7) {
            color = "red";
          }
          else if (features[i].properties.mag > 5) {
            color = "brown";
          }
          else if (features[i].properties.mag > 4) {
            color = "yellow";
          }
          else {
            color = "white";
          }
        
          // // Add circles to map
          L.circle(features[i].geometry.coordinates, {
            fillOpacity: 0.75,
            color: "red",
            fillColor: color,
            // Adjust radius
          
            radius: 10000 * features[i].geometry.coordinates.pop() //countries[i].points * 1500
            
          }).bindPopup("<h3>" + features[i].properties.place + "</h3> <hr> <center><h3>Mag: "+ features[i].properties.mag  + "</h3>").addTo(myMap);

          console.log(`${[i]}  test place:     ${features[i].properties.place}`);
          console.log(`${[i]}  test cordinates:    ${features[i].geometry.coordinates}`);
        };
  };
//};
