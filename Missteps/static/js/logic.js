// test plumbing
console.log("test connection")


// Earthquake JSON URL ###############################################################################################
// significant earthquakes past 7 days
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

// all earthquakes past 7 days
//var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

// significant earthquakes past 30 days
//var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// all earthquakes past 30 days
//var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Earthquake JSON URL ###############################################################################################



// Perform a GET request to the query URL   **** creates anyonmos function to store json data as data.features
d3.json(queryUrl, function(data) {
    console.log(data.features);
    
    //console.log(data.features.geometry.coordinates);
    //console.log(data.features.properties.place);
    createFeatures(data.features);
    //circleFeatures(data.features);
});


function createFeatures(earthquakeData) {
    
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + (feature.properties.place) +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
        console.log(feature.geometry.coordinates)
    }
  
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature 
    
    });

  
    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);

};

    // ********************************************************************************
    // Basic map

    function createMap(earthquakes) {
        // Define a function we want to run once for each feature in the features array
        // Give each feature a popup describing the place and time of the earthquake
        function onEachFeature(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
        }
        // Create a GeoJSON layer containing the features array on the earthquakeData object
        // Run the onEachFeature function once for each piece of data in the array
        var earthquakes = L.geoJSON(earthquakeData, {
            onEachFeature: onEachFeature
            });
        
        // Sending our earthquakes layer to the createMap function
        createMap(earthquakes);
    };

    function createMap(earthquakes) {

        // Define streetmap and darkmap layers
        var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
          attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
          tileSize: 512,
          maxZoom: 18,
          zoomOffset: -1,
          id: "mapbox/streets-v11",
          accessToken: API_KEY
        });
      
        var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
          attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
          maxZoom: 18,
          id: "dark-v10",
          accessToken: API_KEY
        });
      
        // Define a baseMaps object to hold our base layers
        var baseMaps = {
          "Street Map": streetmap,
          "Dark Map": darkmap
        };
      
        // Create overlay object to hold our overlay layer
        var overlayMaps = {
          Earthquakes: earthquakes
        };
      
        // Create our map, giving it the streetmap and earthquakes layers to display on load
        var myMap = L.map("map", {
          center: [
            42.574444444, -92.786666666
          ],
          zoom: 4,
          layers: [streetmap, earthquakes]
        });
        
        // Create a circle and pass in some initial options ---- for fun
        L.circle([42.574444444, -92.786666666], {
            color: "green",
            fillColor: "green",
            fillOpacity: 0.75,
            radius: 500
        }).addTo(myMap);

        // Create a layer control
        // Pass in our baseMaps and overlayMaps
        // Add the layer control to the map
        L.control.layers(baseMaps, overlayMaps, {
          collapsed: false
        }).addTo(myMap);
    };
        
// Loop through the cities array and create one marker for each city object


function circleFeatures(xfeature) {
    console.log(xfeature);
    console.log(xfeature.geometry.coordinates);
    var cord = []
    var cordPop =[]
    var actCord =[]
    // cord = feature.geometry.coordinates
    // cordPop = feature.geometry.coordinates.pop()
    // actCord = feature.geometry.coordinates
    // console.log("variable cordPop:" + cordPop);
    // console.log("Desired Coordinates actCord:" + actCord)
    //     for (var i = 0; i < cities.length; i++) {
    //         L.circle(cities[i].location, {
    //         fillOpacity: 0.75,
    //         color: "white",
    //         fillColor: "purple",
    //         // Setting our circle's radius equal to the output of our markerSize function
    //         // This will make our marker's size proportionate to its population
    //         radius: markerSize(cities[i].population)
    //         }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
     
};

