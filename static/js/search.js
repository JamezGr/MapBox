document.addEventListener("DOMContentLoaded", function(event) {


    var search_result = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiamFtZXpnciIsImEiOiJjazVtZWJjM2QwdzBrM2VwYzBiNG5pazE5In0.T8wAj5VlDit_WoBOJL_4iA";

    $("#search-button").click(function () {

        var search_text = $("#search-box ").val();
        console.log(search_text);

        search_text = encodeURI(search_text);

        const Http = new XMLHttpRequest();
        const url= "https://api.mapbox.com/geocoding/v5/mapbox.places/" + search_text + ".json?access_token=" + mapboxgl.accessToken;
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {

            e.preventDefault();
            var search_data = JSON.parse(Http.responseText);
            var center_data = search_data.features[0].center;

            var center_points = [center_data[0], center_data[1]];

            console.log(center_points);

            initMap(center_points);

            // var points_found = 0;
            //
            // while (points_found < center_points.length) {
            //     console.log(center_points[points_found]);
            //
            //     points_found++;
            // }

        };
    })


});