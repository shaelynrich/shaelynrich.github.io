$('#query').keyup(function () {
  // All code will be inside of this block
  var value = $('#query').val();
  var rExp = new RegExp(value, "i");
  $.getJSON("http://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
    console.log(data);
    // Begin building output
    var output = '<ol>';
    $.each(data.RESULTS, function (key, val) {
      if (val.name.search(rExp) != -1) {
        output += '<li>';
        output += '<a href="#" onclick="getData(' + val.lat + ',' + val.lon + ')" title="See results for ' + val.name + '">' + val.name + '</a>';
        output += '</li>';
      }
    }); // end each
    output += '</ol>';
    $("#searchResults").html(output); // send results to the page
  }); // end getJSON
}); // end keyup

// Get weather data from wunderground.com
function getData(lat, lon) {
  // Get the data from the wunderground API
  $.ajax({
    url: "http://api.wunderground.com/api/2b54603e3f31a8af/geolookup/conditions/q/" + lat + "," + lon + ".json",
    dataType: "jsonp",
    success: function (data) {
      console.log(data);
      var cityState = data.location.city + ', ' + data.location.state;
      var temp = 'Current Temp: ' + Math.round(data.current_observation.temp_f) + String.fromCharCode(176) + 'F';
      var heading = data.location.city + ', ' + data.location.state + ' | Weather Home';
      var precip = 'Precipitation: ' + data.current_observation.precip_today_in;
      var wind = 'Wind Direction: ' + data.current_observation.wind_dir;
      var feel = 'Feels like: ' + Math.round(data.current_observation.feelslike_f) + String.fromCharCode(176) + 'F';
      $('#title').text(heading);
      $("#summary").text(toTitleCase('Summary: ' + data.current_observation.icon));
      $("#cityState").text(cityState);
      $("#icon").attr('src', "https://icons-ak.wxug.com/i/c/k/" + data['current_observation']['icon'] + ".gif");
      $("#highlow").text(temp);
      $("#precip").text(precip);
      $("#winddirect").text(wind);
      $("#feelsLike").text(feel);
      $("#cover").fadeOut(250);
    }
  });
}

// A function for changing a string to TitleCase
function toTitleCase(str) {
  return str.replace(/\w+/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Intercept the menu link clicks
$("#searchResults").on("click", "a", function (evt) {
  evt.preventDefault();
  $("#searchResults").hide();
  // With the text value get the needed value from the weather.json file
  var jsonCity = $(this).text(); // Franklin, etc...
  console.log(jsonCity);
  $.ajax({
    url: "../../javascript/weather.json",
    dataType: "json",
    success: function (data) {
      console.log(data);
      console.log(data[jsonCity]);
      var zip = data[jsonCity].zip;
      console.log(zip);
      getData(zip);
    }
  });
});
