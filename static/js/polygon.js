function generatePolygon(map) {
    var geo_polygon = map.addLayer({
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

    return geo_polygon
}