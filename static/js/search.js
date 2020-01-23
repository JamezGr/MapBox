document.addEventListener("DOMContentLoaded", function(event) {

    //  test data for Map Box
    // var search_result = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=" + mapboxgl.accessToken ;

    $("#search-button").click(function () {

        var search_text = $("#search-box").val();
        console.log(search_text);

        search_text = encodeURI(search_text);

        const Http = new XMLHttpRequest();
        const url= "https://api.mapbox.com/geocoding/v5/mapbox.places/" + search_text + ".json?access_token=" + mapboxgl.accessToken;
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            e.preventDefault();

            var search_data = JSON.parse(Http.responseText);
            console.log(search_data.features);

            if ("features" in search_data) {
                if (search_data.features.length == 0) {
                  console.log("Location Could Not Be Found. Please Try Again.");

                  $(".popup-warning").attr("style", "display: block;")
                }

                else {
                  var center_data = search_data.features[0].center;
                  var center_points = [center_data[0], center_data[1]];

                  // debugging purposes
                  console.log(center_points);
                  console.log(search_data);

                  initMap(center_points);
                }
            }
        };
    })


});
