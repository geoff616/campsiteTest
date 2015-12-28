//global functions to call to create modal

function addEditableFieldsToModal(campsites) {
  var div = $("#pending"),
  fieldsToEdit = ['city', 'subdivision', 'country']
  _.forEach(campsites, function(campsite) {
    div.append("<h3>New campsite in " + campsite.location.city + "</h3>");
    var html,id = campsite.location.googleID;
    _.forEach(fieldsToEdit, function(field) {
      html = '| <a href="#" id="' + id + '-' + field +'">' + campsite['location'][field] +' </a> | ';  
      div.append(html);
      makeEditableTextField(id,field);
    })
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

  function makeEditableDisplayTrueFalse(campsiteID) {
    //name of the field in the model
    var field = "display",
    divID = "#" + campsiteID + "-" + field,
    editURL = '/api/editCampsite/' + campsiteID + "/" + field
    $(function(){
      $('#status').editable({
          type: 'select',
          pk: 1,    
          url: editURL, 
          title: "Display this campsite?",
          value: false,    
          source: [
                {value: false, text: 'False'},
                {value: true, text: 'True'}
             ]
        });
    });

  }


}





