function loginRedirect(session, $state, $location, hasPermission) {
  var userId = null;
  var lastUrl = null;

  session.on('logout', function(data) {
    // Remember URL if user was forced to logout
    if (data.forced) {
      userId = data.userId;
      lastUrl = $location.url();
    } else {
      userId = null;
      lastUrl = null;
    }
  });

  return function loginRedirect(user) {
    // Logging back in as the same user
    if (user.id === userId) {
      $location.url(lastUrl);
    } else {
      var state;

      if (hasPermission(user, 'VIEW_PATIENT')) {
        state = 'patients';
      } else {
        state = 'index';
      }

      $state.go(state);
    }
  };
}

loginRedirect.$inject = ['session', '$state', '$location', 'hasPermission'];

export default loginRedirect;