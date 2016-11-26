// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
    status.text('Getting Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        // Call the getData function, send the lat and long
        getData(lat, long);

      });
    } else {
      status.text("Your browser doesn't support Geolocation or it is not enabled!");
    }

  })();

  // Get the data from the wunderground API
  function getData(lat, long) {
    $.ajax({
      url: 'http://api.wunderground.com/api/2b54603e3f31a8af/geolookup/conditions/q/' + lat + ',' + long + '.json',
      dataType: "jsonp",
      success: function (data) {
        var cityState = data.location.city + ', ' + data.location.state;
        var heading = data.location.city + ', ' + data.location.state + ' | Weather Home';
        var temp = 'Current Temperature: ' + Math.round(data.current_observation.temp_f) + String.fromCharCode(176) + 'F';
        var summary = 'Summary: ' + data.current_observation.weather;
        var precip = 'Precipitation: ' + data.current_observation.precip_today_in;
        var wind = 'Wind Direction: ' + data.current_observation.wind_dir;
        var feel = 'Feels like: ' + Math.round(data.current_observation.feelslike_f) + String.fromCharCode(176) + 'F';
        var humidity = 'Humidity: ' + data.current_observation.relative_humidity;
        $("#cityDisplay").text(cityState);
        $('#title').text(heading);
        $('#highlow').text(temp);
        $('#summary').text(summary);
        $('#add1').text(precip);
        $('#add2').text(wind);
        $('#add3').text(feel);
        $('#add4').text(humidity);
        $("#cover").fadeOut(250);
        console.log(data);
      }
    });
  }


  // A function for changing a string to TitleCase
  function toTitleCase(str) {
    return str.replace(/\w+/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
});
