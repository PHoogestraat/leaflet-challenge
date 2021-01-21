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
  }).bindPopup("<center><h2>The Sacred Acer </h2>").addTo(myMap);



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
  position: "topright"
});

// Legend??????????????????????????????????????????
//        Code below creates a div called legend so data can be added
// Create a legend to display information about our map
var infoMAG = L.control({
  position: "bottomright"
});


//**************************************************************************************** */


// Links from USGS GOV 

// significant earthquakes past 7 days-     SMALL DATA SET
//var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

// all earthquakes past 30 days             LARGE DATA SET
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

  



  // Plots circles
  circPlot(data.features);


}); 


  //**************************************************************************************** */
  // Loop through the cities array and create one marker for each city object

function circPlot(features) {
  
  // Depth count
  var limeCount = 0;   
  var redCount = 0
  var orangeCount = 0
  var yellowCount = 0
  var darkseagreenCount = 0
  var whiteCount = 0

  
  // Magnitude count
  var sixMagCount =0
  var fiveMagCount =0
  var fourMagCount =0
  var threMagCount =0
  
  var smallMagCount =0

      for (var i = 0; i < features.length; i++) {

          
          let depthRadius = features[i].geometry.coordinates.pop()
          let magData = features[i].properties.mag
          
          
          // Conditionals for quake Depth
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
          


          // Conditionals for Magnituted
          
          if (magData >= 6) {
        
            sixMagCount++;
          }
          else if (magData>= 5) {
            color = "orange ";
            fiveMagCount++;
          }
          else if (magData >= 4) {
           
            fourMagCount++;
          }

          else if (magData >= 3) {
            color ='darkseagreen';
            threMagCount++;
          }

          
          else {
            
            smallMagCount++;
          }
          //var testX ="Eathquake alarm"
          //let depthRadius = features[i].geometry.coordinates.pop()
          

          // // Add circles to map
          L.circle(features[i].geometry.coordinates.reverse(), {
            fillOpacity: 0.75,
            color: "red",
            fillColor: color,
            // Adjust radius
          
            radius: 6500 * magData 
            
          }).bindPopup("<h2>" + features[i].properties.place + "</h2> <hr> <center><h2>Mag: "+ features[i].properties.mag  + "</h2>").addTo(myMap);

          // console.log(`${[i]}  test place:     ${features[i].properties.place}`);
          // console.log(`${[i]}  test cordinates:    ${features[i].geometry.coordinates}`);
          // console.log(`${[i]}  Depth Radius:    ${depthRadius}`);
          
      
      
      
      
      
          // //          Function updates data to legend
      // When the layer control is added, insert a div with the class of "legend"
      info.onAdd = function() {
        var div = L.DomUtil.create("div", "legend");
        return div;
      };
      // Add the info legend to the map for quake depth
      info.addTo(myMap);
      document.querySelector(".legend").innerHTML = [
        
            "<p><b><center><h2><u>Legend</u></h2></center></b> </p>",
            "<p class='number-eathquakes'><center>Number of Earthquake:" + features.length +  " </center></p>",
            "<p class='redGr90'> Quake Depth (Red) > 90 meters:    " +  redCount  + "</p>",
            "<p class='oranGr70'>Quake Depth (Orang) > 70  meters:  " + orangeCount + "</p>",
            "<p class='yellowGr50'>Quake Depth (Yellow) > 50 meters :  " + yellowCount+ "</p>",
            "<p class='greenGr30'>Quake Depth (Darksgreen) > 30 meters:  " + darkseagreenCount + "</p>",
            "<p class='limeGr10'>Quake Depth  (Lime) > 10 meters :  " + limeCount + "</p>",
            "<p class='whiteLe10'>Quake Depth (White) < 10 meters :  " + whiteCount + "</p>",

      ].join("");


                // //          Function updates data to legend
      // When the layer control is added, insert a div with the class of "legend"
      infoMAG.onAdd = function() {
        var div = L.DomUtil.create("div", "mag");
        return div;
      };
      
      // Add the info legend to the map for quake depth
      infoMAG.addTo(myMap);
      document.querySelector(".mag").innerHTML = [
        
            "<p><b><center><h2><u>Magnitude </u></h2></center></b> </p>",
            "<p class='number-eathquakes'><center>Earthquakes:" + features.length +  " </center></p>",
            "<p class='redGr90'> Magnitude > 6 :    " +  sixMagCount  + "</p>",
            "<p class='oranGr70'> Magnitude > 5 :   " + fiveMagCount + "</p>",
            "<p class='yellowGr50'> Magnitude > 4 :  " + fourMagCount+ "</p>",
            "<p class='greenGr30'>Magnitude > 3 :  " + threMagCount + "</p>",
            "<p class='limeGr10'>Magnitude < 3  :  " + smallMagCount + "</p>",
            

      ].join("");


        }
   





};


