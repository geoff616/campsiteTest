//global functions to call to create modal
//TODO: clean this up

function addEditableFieldsToModal(campsites) {
  var div = $("#pending"),
  fieldsToEdit = ['city', 'subdivision', 'country']
  _.forEach(campsites, function(campsite) {
    div.append("<h3>New campsite in " + campsite.location.city + "</h3>");
    var html,displayDropdown,id = campsite.location.googleID;
    div.append("<div class=\"well\" id=\"" + campsite.location.googleID +"-well\"></div>")
    var well = $("#" + id + "-well");
    well.append("<a href=\"" + campsite.location.mapLink + "\">Google Map Link</a>")
    _.forEach(fieldsToEdit, function(field) {
      html = '<p>' +field +': <a href="#" id="' + id + '-' + field +'">' + campsite['location'][field] +' </a> </p>';  
      well.append(html);
      makeEditableTextField(id,field);
    })

    //display dropdown
    displayDropdown = '<p>Display: <a href="#" id="' + id + '-display">' + campsite['display'] +' </a> </p>'
    well.append(displayDropdown)
    makeEditableDisplayTrueFalse(id, "display", "Display this campsite to users?");

    //deleted dropdown
    displayDropdown = '<p>Deleted: <a href="#" id="' + id + '-deleted">' + campsite['display'] +' </a> </p>'
    well.append(displayDropdown)
    makeEditableDisplayTrueFalse(id, "deleted", "This will leave in the DB but hide from this view and not show to users");
  });




  function makeEditableTextField(googleID, field) {
    var divID = "#" + googleID + "-" + field,
    editURL = '/api/editCampsite/' + googleID + "/" + field,
    prompt = 'Enter a new ' + field;

    $(divID).editable({
      type: 'text',
      url: editURL,    
      pk: 1,    
      title: prompt,
      ajaxOptions: {
          type: 'post'
      }        
    });

  }


  function makeEditableDisplayTrueFalse(googleID, field, message) {

    var divID = "#" + googleID + "-" + field,
    editURL = '/api/editCampsite/' + googleID + "/" + field
    $(function(){
      $(divID).editable({
          type: 'select',
          pk: 1,    
          url: editURL, 
          title: message,
          value: 1,    
          source: [
                {value: 1, text: 'False'},
                {value: 2, text: 'True'}
             ]
        });
    });

  }


}





