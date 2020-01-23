// wait until page has loaded
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
                  // debugging purposes
                  console.log("Location Could Not Be Found. Please Try Again.");

                  // display invalid search location pop up
                  $(".popup-warning").attr("style", "display: block;");
                }

                else {

                  // get coordinates of search location
                  var center_data = search_data.features[0].center;
                  var center_points = [center_data[0], center_data[1]];
                  var coordinates = center_data[0] + ", " + center_data[1];

                  var location =  search_data.features[0].text;
                  var full_location = search_data.features[0].place_name;

                  const geo_data = [center_points, location, full_location, coordinates];

                  var map = initMap(geo_data[0]);

                  map.on('style.load', function () {
                      getSearchLocation(map, geo_data);
                  });

                }
            }
        };
    })

    // close invalid location pop up
    $(".close-icon").click(function () {
        $(".popup-warning").fadeOut("slow");
    });
});
