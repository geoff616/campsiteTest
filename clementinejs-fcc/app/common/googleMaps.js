function addPinsToMap(campsites) {
    var image = '/public/img/campsite.png';

  _.forEach(campsites, function(campsite) {
    var campsiteMarker = new google.maps.Marker({
      position: {lat: campsite.location.loc[1], lng: campsite.location.loc[0]},
      map: map,
      icon: image
    });

  })

}

function addListOfCampsites(grouped) {

  console.log(grouped);


  var list = $('ul.campsites');
  $.each(grouped, function(country, arr) {
    $("<li/>").text(country).appendTo(list);
    var countryList = _.kebabCase(country) + "-list"
    list.append("<ul id='" + countryList + "'></ul>");
    $.each(arr, function(n, campsite) {
      var countryListID = "#" + countryList
       $(countryListID).append("<li><a target=\"_blank\" href=\"" + campsite.url + "\">" + campsite.location.city + "</a></li>");
    });
  })


}

function displayCampsites(data) {
  
  //add a pin for each campsite
  addPinsToMap(data)

  //group by country then sort alphabetically

  var grouped = _(data).groupBy(function(site) {
      return site.location.country;
  }).forEach(function(country){
    _.sortBy(country, function(site){
      return site.location.locality;
    });
  }).value();

  addListOfCampsites(grouped)

}

function centerIfLocationEnabled(map) {
 // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
    }, function() {
      handleLocationError(true,  map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }
}


function makeHomepageMap() {
  
  //clear loading message
  $("#homepage-map").empty();

  var pos 
  //making this global, need to figure out how to pass to jquery callback :/
  map = new google.maps.Map(document.getElementById('homepage-map'), {
    zoom: 4,
    center: {lat: 40.730610, lng: -73.935242}
  });

  centerIfLocationEnabled(map)
  

  //couldnt figure out how to resuse navigator from above function :(

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var campsites = $.ajax({
        type: "POST",
        url: "/api/queryCampsites",
        data: JSON.stringify(pos),
        contentType: "application/json",
        dataType:'json',
        success: displayCampsites
      });

     
    })
  } else {
    // Browser doesn't support Geolocation

  }
}


//from: https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.



function makeSearchMap() {

  var map = new google.maps.Map(document.getElementById('search-map'), {
      center: {lat: 40.730610, lng: -73.935242},
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

   centerIfLocationEnabled(map);
  


  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      
      //NOTE: Making this global, but shuold pass to a function somehow
      //ALSO: This assumes only one place has been selected, which might not be the case if
      //a user's search result has yielded many results
      globalPlace = place;


      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  // [END region_getplaces]
}
