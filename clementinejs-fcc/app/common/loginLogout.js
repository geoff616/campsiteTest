//this function executes on home page load to determine if login or logout should be displayed
(function setLoginLogout() {

  var loginHtml = '<a href="/login" class="btn btn-success btn-lg"  id="login-button">Login</a>';
  var logoutHtml = '<a href="/logout" class="btn btn-danger btn-lg"  id="logout-button">Logout</a>'

$.get('/api/isLoggedIn', function(data) {
  if (data === "true") {
    //give user the option to log out
    $("#login-logout").empty().append(logoutHtml).css('width', '25%');
  } else {
    //give user the option to log in
    $("#login-logout").empty().append(loginHtml).css('width', '25%');
  }
}) 

})();