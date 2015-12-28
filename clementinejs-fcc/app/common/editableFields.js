//global functions to call for each editable text field

_

function makeEditableTextField(campsiteID, field) {
  var divID = "#" + campsiteID + "-" + field,
  editURL = '/api/editCampsite/' + campsiteID + "/" + field,
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

