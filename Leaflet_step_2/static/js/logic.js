// test plumbing
console.log("test connection 2")
var redNum = 0
//**************************************************************************************** */
// Create a map object

var myMap = L.map("map", {
    center: [42.574444444, -92.786666666],
    zoom: 4

  });
  // Create a circle and pass in some initial options ---- for fun
  L.circle([42.574444444, -92.786666666], {
    color: "black",
    fillColor: "yellow",
    fillOpacity: 0.85,
    radius: 1000
  }).bindPopup("<center><h3>The Sacred Acer </h3>").addTo(myMap);



  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

// Legend??????????????????????????????????????????
//        Code below creates a div called legend so data can be added
// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});


//**************************************************************************************** */


// Links from USGS GOV 

// significant earthquakes past 7 days-     SMALL DATA SET
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

// all earthquakes past 30 days
//var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// significant earthquakes past 30 days
//var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// Perform a GET request to the query URL   **** creates anyonmos function to store json data as data.features
d3.json(queryUrl, function(data) {
  var coord = [];
  

  //console.log(data.features.geometry.coordinates);
  
  var coord = data.features
  console.log("coord test for variable coord");
  console.log(coord);

  



  // Plots circles
  circPlot(data.features);


}); 


  //**************************************************************************************** */
  // Loop through the cities array and create one marker for each city object

function circPlot(features) {
  var limeCount = 0;   
  var redCount = 0
  var orangeCount = 0
  var yellowCount = 0
  var darkseagreenCount = 0
  var whiteCount = 0

      
      for (var i = 0; i < features.length; i++) {
          //console.log(features.length);
          // var numbEathquakes = features.lenght
          // console.log(numbEathquakes);
          
          let depthRadius = features[i].geometry.coordinates.pop()
          let magData = features[i].properties.mag
          
          
          // Conditionals for countries points
          var color = "";
          if (depthRadius >= 90) {
            color = "red";
            redCount++;
          }
          else if (depthRadius >= 70) {
            color = "orange ";
            orangeCount++;
          }
          else if (depthRadius >= 50) {
            color = "yellow";
            yellowCount++;
          }

          else if (depthRadius >= 30) {
            color ='darkseagreen';
            darkseagreenCount;
          }

          else if (depthRadius >= 10) {
            color ='lime';
            limeCount++;
          
          }

          
          else {
            color = 'white';
            whiteCount++;
          }
          
          var testX ="Eathquake alarm"
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
          
      
      
      
      
      
          // //          Function updates data to legend
      // When the layer control is added, insert a div with the class of "legend"
      info.onAdd = function() {
        var div = L.DomUtil.create("div", "legend");
        return div;
      };
      // Add the info legend to the map
      info.addTo(myMap);
      document.querySelector(".legend").innerHTML = [
        
            "<p><b><center><h3><u>Legend</u></h3></center></b> </p>",
            "<p class='number-eathquakes'>Number of Earthquake:" + features.length +  " </p>",
            "<p class='number-eathquakes'> Depth of quake (Red) >90 meters:    " + redCount + "</p>",
            "<p class='number-eathquakes'>Depth of quake (orang)> 70  meters:  " + orangeCount + "</p>",
            "<p class='number-eathquakes'>Depth of quake (yellow)> 50 meters :  " + yellowCount+ "</p>",
            "<p class='number-eathquakes'>Depth of quake (darksgreen) > 30 meters:  " + darkseagreenCount + "</p>",
            "<p class='number-eathquakes'>Depth of quake (lime) > 10 meters :  " + limeCount + "</p>",
            "<p class='number-eathquakes'>Depth of quake (white) < 10 meters :  " + whiteCount + "</p>",

      ].join("");




        }
   
};


