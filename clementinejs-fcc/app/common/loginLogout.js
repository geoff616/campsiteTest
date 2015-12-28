

function setLoginLogout(data) {

  var loginHtml = '<a href="/login" class="btn btn-success btn-lg"  id="login-button">Login</a>';
  var logoutHtml = '<a href="/logout" class="btn btn-danger btn-lg "  id="logout-button">Logout</a>';

  if (data === "true") {
    //give user the option to log out
    $("#header-buttons").append(logoutHtml)
  } else {
    //give user the option to log in
    $("#header-buttons").append(loginHtml)
  }
}

function showCampsiteReviewButton(data) {
  
// is this the right error check? Could be stricter
  if (data === "true") {

    //get count of pending campsites
    $.get('/api/pendingCampsites', function(data) {
      if (data.length > 0) {
        var count = data.length.toString();
        console.log(count);
        var modalButtonHTML = '<button type="button" class="btn btn-info btn-lg" id="review-button" data-toggle="modal" data-target="#reviewModal">'+count+' campsites to review</button>'
        $("#header-buttons").append(modalButtonHTML);
        addEditableFieldsToModal(data);
      }
    })
  } 

}


//this function executes on home page load to determine what buttons should be displayed
(function loggedInUserSettings() {

  $.get('/api/isLoggedIn', function(data) {
    showCampsiteReviewButton(data);
    setLoginLogout(data);
  })

})();