// TODO: Read Config Data from config.json

// var CONFIG = require('./config.json');
// 
// var access_token = CONFIG.mapbox_access_token;
// var start_location = CONFIG.start_location;
// var end_location = CONFIG.end_location;

// console.log(access_token);

// wait for page to load
document.addEventListener("DOMContentLoaded", function(event) {

    mapboxgl.accessToken =
  "pk.eyJ1IjoiamFtZXpnciIsImEiOiJjazVtZWJjM2QwdzBrM2VwYzBiNG5pazE5In0.T8wAj5VlDit_WoBOJL_4iA";

    var location = [-2.614848, 51.529454];

    var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: location,
    zoom: 15,

});

map.on('load', function() {
    map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': {
            'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [
                    [
                    [-2.621784210205078, 51.533389400480274],
                    [-2.6202392578125, 51.53380318432172],
                    [-2.6191020011901855, 51.534523960095235],
                    [-2.6179003715515137, 51.534523960095235],
                    [-2.6154112815856934, 51.535204682290626],
                    [-2.6146602630615234, 51.535551713217494],
                    [-2.614145278930664, 51.53641927895924],
                    [-2.6109266281127925, 51.53480425870272],
                    [-2.6088666915893555, 51.5335629231943],
                    [-2.6085662841796875, 51.5322014195186],
                    [-2.6085877418518066, 51.531453909988855],
                    [-2.609553337097168, 51.5303593203175],
                    [-2.610797882080078, 51.52903776845088],
                    [-2.613222599029541, 51.528036567254695],
                    [-2.6145744323730464, 51.52748923462628],
                    [-2.6169347763061523, 51.52871738646354],
                    [-2.6203250885009766, 51.530893269786475],
                    [-2.621397972106933, 51.53258851784387]
                        ]
                    ]
                }
            }
        },
        'layout': {},
        'paint': {
        'fill-color': '#088',
        'fill-opacity': 0.8
        }
    });

    // Display Route On Map Box
    generateRoute(map);
});

});

// TODO: feature to get location on Map Based on Search Coordinates
function getLocation(latitude, longitude) {
    console.log("Working");
    map[center] = [latitude, longitude];
}

// TODO: Generate Route from Test Locations
function generateRoute(map) {

    const Http = new XMLHttpRequest();
    const url='https://api.mapbox.com/directions/v5/mapbox/driving/-2.6147890090942383%2C%2051.52931810084035%3B%20-2.526702582836151%2C%2051.47151813896309.json?access_token=' + mapboxgl.accessToken + '&geometries=geojson';
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {

        var json = JSON.parse(Http.responseText);
        var route_data = json.routes[0];
        var coordinates_data = route_data.geometry.coordinates;

        console.log(coordinates_data);

        var geojson_data = {
            type: 'Feature',
            properties: {},
            geometry: {
            type: 'LineString',
            coordinates: coordinates_data
        }
    }

    if (map.getSource('route')) {
      map.getSource('route').setData(geojson_data);
    }

    else {

            var start_popup = new mapboxgl.Popup({ closeOnClick: false })
                .setLngLat([-2.6147890090942383, 51.52931810084035])
                .setHTML('<h1>Place A</h1>')
                .addTo(map);


            // Add Marker For Start Point
            map.addLayer({
            id: 'start',
            type: 'circle',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: [{
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: [-2.6147890090942383, 51.52931810084035]
                  }
                }
                ]
              }
            },
            paint: {
              'circle-radius': 10,
              'circle-color': '#ffffff'
            }
          });


            map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': {
                'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': geojson_data
                }
            }
        },
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
            }
        });

        var end_popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([-2.526702582836151, 51.47151813896309])
        .setHTML('<h1>Place B</h1>')
        .addTo(map);

          map.addLayer({
            id: 'end',
            type: 'circle',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: [{
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: [-2.526702582836151, 51.47151813896309]
                  }
                }
                ]
              }
            },
            paint: {
              'circle-radius': 10,
              'circle-color': '#069fba'
            }
          });

      }


}
}

