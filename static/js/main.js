// TODO: create Initialize Map Function

// wait for page to load
document.addEventListener("DOMContentLoaded", function(event) {
    var config = loadConfig();
    mapboxgl.accessToken = config.mapbox_access_token;

    var center_point = config.center_location;
    var start_point = config.start_location;
    var end_point = config.end_location;

    // create new instance of map
    var map = initMap(center_point);

    map.on('load', function() {
        // display Polygon over Selected Location on Map
        generatePolygon(map);

        // display Route On Map Box
        generateRoute(map, start_point, end_point);
    });
});

function initMap(center_point) {
    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: center_point,
        zoom: 15,
    });

    return map
}

// TODO: feature to get location on Map Based on Search Coordinates
function getLocation(latitude, longitude) {
    console.log("Coordinates are " + [latitude, longitude]);
}

// TODO: Generate Route from Test Locations
function generateRoute(map, start_point, end_point) {

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

