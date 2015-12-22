'use strict';

(function () {


   var newCampsiteSubmit = document.querySelector('#newCampsiteSubmit');
   

   function parseGoogleLocation(loc) {

      function addAddressComponent(loc, partName) {
        try{
          return loc.address_components.filter(function(part){return part.types[0] === partName})[0].long_name
        } catch(e){
          if (partName === "locality") {
            return addAddressComponent(loc, "sublocality_level_1")
          } else {
            return "missing from this location"  
          }
          
        }
      }


      var toReturn = {
         city: addAddressComponent(loc, "locality"),
         subdivision: addAddressComponent(loc, "administrative_area_level_1"),
         country: addAddressComponent(loc, "country"),
         loc:[globalPlace.geometry.location.lng(), globalPlace.geometry.location.lat()],
         googleID: loc.id
      }


      return toReturn;
   }

   newCampsiteSubmit.addEventListener('click', function () {

      console.log('in here');
      var locationObj = parseGoogleLocation(globalPlace);


      var objToStore = {
         url: $('#campsiteURL').val(),
         location: locationObj,
      }
      
      $.ajax({
        type: "POST",
        url: "/api/addCampsite",
        data: JSON.stringify(objToStore),
        contentType: "application/json",
        dataType:'json',
        success: function() {console.log('success')}
      });

         
   }, false);


})();
