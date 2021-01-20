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

// // When the layer control is added, insert a div with the class of "legend"
// info.onAdd = function() {
//   var div = L.DomUtil.create("div", "legend");
//   return div;
// };
// // Add the info legend to the map
// info.addTo(myMap);

// //          Function updates data to legend
// function updateLegend(features) {
//   console.log(features.length);
//   var earhtquakeSum = features.length
  
//   for (var i = 0; i < features.length; i++) {
        
//         //console.log(features[i].geometry.coordinates.pop());
        
//         var depthRadiusa = features[i].geometry.coordinates;
//         //var depthRadiusa = depthRadiusa.lenght;
//         console.log(`${[i]}  Depth Radius:    ${depthRadiusa}`);
        


//         document.querySelector(".legend").innerHTML = [
          
//           "<p><b><center><h3><u>Legend</u></h3></center></b> </p>",
//           "<p class='number-eathquakes'>Number of Earthquake:    " + earhtquakeSum + "    </p>",
//           "<p class='coming-soon'>Stations Coming Soon: " + depthRadiusa + "</p>",
//           // "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
//           // "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
//           // "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
//         ].join("");
//   };
// };






//**************************************************************************************** */


// Country data 

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

  

  testJson(data.features);
  circPlot(data.features);

  //updateLegend(data.features)
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
      
      

      for (var i = 0; i < features.length; i++) {
          console.log(features.length);
          var numbEathquakes = features.lenght
          console.log(numbEathquakes);
          
          let depthRadius = features[i].geometry.coordinates.pop()
          let magData = features[i].properties.mag
          
          var redNum = 0
          // Conditionals for countries points
          var color = "";
          if (depthRadius > 90) {
            color = "red";
            //var redNum =  redNum++
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
            var redNum =  redNum++
          }

          
          else {
            color = 'white';
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
          

          // When the layer control is added, insert a div with the class of "legend"
          info.onAdd = function() {
            var div = L.DomUtil.create("div", "legend");
            return div;
          };
          // Add the info legend to the map
          info.addTo(myMap);

          // //          Function updates data to legend
          // function updateLegend(features) {
          //   //console.log(features.length);
          //   //var earhtquakeSum = features.length
            
          //   for (var i = 0; i < features.length; i++) {
                    

                  




        document.querySelector(".legend").innerHTML = [
          
              "<p><b><center><h3><u>Legend</u></h3></center></b> </p>",
              "<p class='number-eathquakes'>Number of Earthquake:    " + features.length + "    </p>",
              //"<p class='coming-soon'> High Ground: " + redNumb + "</p>",
              // "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
              // "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
              // "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
        ].join("");




        }
};


  /////////////////  legend
  
// Create legend

















// // Update the legend's innerHTML with the last updated time and station count
// function updateLegend(depthRadius, stationCount) {
//   document.querySelector(".legend").innerHTML = [
//     "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
//     "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
//     "<p class='coming-soon'>Stations Coming Soon: " + stationCount.COMING_SOON + "</p>",
//     "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
//     "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
//     "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
//   ].join("");
// }