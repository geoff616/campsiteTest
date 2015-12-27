

function setLoginLogout(data) {

  var loginHtml = '<a href="/login" class="btn btn-success btn-lg"  id="login-button">Login</a>';
  var logoutHtml = '<a href="/logout" class="btn btn-danger btn-lg "  id="logout-button">Logout</a>';

  if (data === "true") {
    //give user the option to log out
    $("#login-logout").empty().append(logoutHtml)
  } else {
    //give user the option to log in
    $("#login-logout").empty().append(loginHtml)
  }
}

function showCampsiteReviewButton(data) {
  if (data === "true") {

    //get count of pending campsites
    $.get('/api/countOfPendingCampsites', function(data) {
      if (data > 0) {
        var modalButtonHTML = '<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#reviewModal">'+data+' campsites to review</button>'
        $("#review-button").append(modalButtonHTML);
      }
    })
  } 

}


//this function executes on home page load to determine what options should be displayed
(function loggedInUserSettings() {

  $.get('/api/isLoggedIn', function(data) {
    setLoginLogout(data);
    showCampsiteReviewButton(data);
  })

})();