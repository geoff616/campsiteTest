//global function to call for each editable text field

function makeEditableTextField(campsiteID, field) {
  var divID = "#" + campsiteID + "-" + field,
  editURL = '/api/editcampsite/' + campsiteID + "/" + field,
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

