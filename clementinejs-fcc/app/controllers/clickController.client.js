'use strict';

(function () {


   var newCampsiteSubmit = document.querySelector('#newCampsiteSubmit');
   

   function parseGoogleLocation(loc) {
      var toReturn = {
         city: loc.address_components.filter(function(part){return part.types[0] === "locality"})[0].long_name,
         subdivision: loc.address_components.filter(function(part){return part.types[0] === "administrative_area_level_1"})[0].long_name,
         country:loc.address_components.filter(function(part){return part.types[0] === "country"})[0].long_name,
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
      console.log(objToStore)
      //maybe move this somewhere else?
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
