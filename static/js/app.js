document.addEventListener("DOMContentLoaded", function(event) {

    console.log("Ready");

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
});


});

function getLocation(latitude, longitude) {

    console.log("Working");

    map[center] = [latitude, longitude];

}


function generateRoute() {

    var start = encodeURI("-2.6146, 51.5294;");
    var end = encodeURI("-2.5267, 51.4715;");

    var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/-2.6146%2C51.5294%3B-2.5267%2C51.4715.json?access_token=pk.eyJ1IjoiamFtZXpnciIsImEiOiJjazVtZWJjM2QwdzBrM2VwYzBiNG5pazE5In0.T8wAj5VlDit_WoBOJL_4iA';

    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.send();
    req.onload = function() {

    var json = JSON.parse(req.response);
    console.log(req);
    var data = json.routes[0];




  // var route = data.geometry.coordinates;
  // var geojson = {
  //   type: 'Feature',
  //   properties: {},
  //   geometry: {
  //     type: 'LineString',
  //     coordinates: route
  //   }
  // };
  //
  //
  // if (map.getSource('route')) {
  //   map.getSource('route').setData(geojson);
  // } else {
  //   map.addLayer({
  //     id: 'route',
  //     type: 'line',
  //     source: {
  //       type: 'geojson',
  //       data: {
  //         type: 'Feature',
  //         properties: {},
  //         geometry: {
  //           type: 'LineString',
  //           coordinates: geojson
  //         }
  //       }
  //     },
  //     layout: {
  //       'line-join': 'round',
  //       'line-cap': 'round'
  //     },
  //     paint: {
  //       'line-color': '#3887be',
  //       'line-width': 5,
  //       'line-opacity': 0.75
  //     }
  //   });
  // }

  };

