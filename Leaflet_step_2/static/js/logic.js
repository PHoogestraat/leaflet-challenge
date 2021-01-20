// test plumbing
console.log("test connection 2")

//**************************************************************************************** */
// Create a map object

var myMap = L.map("map", {
    center: [42.574444444, -92.786666666],
    zoom: 4

  });
  // Create a circle and pass in some initial options ---- for fun
  L.circle([42.574444444, -92.786666666], {
    color: "yellow",
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


// all earthquakes past 30 days
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// significant earthquakes past 30 days
//var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

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

      // var newData = L.geoJSON(features, {
      //       onEachFeature: onEachFeature 
      
      //});
      //console.log(newData)
    };

// Need to install a geoJSON file to fix plotting ??????????????????????????????????????????????????????????????????????
// function geodata(){
//       var earthquakes = L.geoJSON(earthquakeData, {
//         onEachFeature: onEachFeature 

//       // Sending our earthquakes layer to the createMap function
//       createMap(earthquakes);
// };
// CODE BLOCK ABOVE NEEDS WORK ???????????????????????????????????????????????????????????????????????????????????????????


  //**************************************************************************************** */
  // Loop through the cities array and create one marker for each city object







function circPlot(features) {
      var popRad =[]
      for (var i = 0; i < features.length; i++) {
          console.log(features.lenght);
          
          let depthRadius = features[i].geometry.coordinates.pop()
          let magData = features[i].properties.mag
          
          // Conditionals for countries points
          var color = "";
          if (depthRadius > 90) {
            color = "red";
          }
          else if (depthRadius > 70) {
            color = "orange ";
          }
          else if (depthRadius > 50) {
            color = "yellow";
          }

          else if (depthRadius > 30) {
            color ='darkseagreen';
          }

          else if (depthRadius > 10) {
            color ='lime';
          }

          
          else {
            color = 'white';
          }
          

          //let depthRadius = features[i].geometry.coordinates.pop()


          // // Add circles to map
          L.circle(features[i].geometry.coordinates.reverse(), {
            fillOpacity: 0.75,
            color: "red",
            fillColor: color,
            // Adjust radius
          
            radius: 6500 * magData //countries[i].points * 1500
            
          }).bindPopup("<h3>" + features[i].properties.place + "</h3> <hr> <center><h3>Mag: "+ features[i].properties.mag  + "</h3>").addTo(myMap);

          console.log(`${[i]}  test place:     ${features[i].properties.place}`);
          console.log(`${[i]}  test cordinates:    ${features[i].geometry.coordinates}`);
          console.log(`${[i]}  Depth Radius:    ${depthRadius}`);
        };
  };
//};
//L.geoJSON
// L.geoJson(data, {
//   // Passing in our style object
//   style: mapStyle
// }).addTo(myMap);