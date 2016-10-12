function authService(
  session,
  $q,
  store,
  adapter
) {
  // True while the user is being logged out
  var loggingOut = false;

  /**
   * Service for authorization actions.
   */
  return {
    login: login,
    logout: logout,
    forgotUsername: forgotUsername,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword
  };

  /**
   * Generic error handler for authentication methods.
   *
   * @param {Object} promise - the promise to reject with the errors.
   * @returns {function} - a function to handle errors.
   */
  function errorHandler(promise) {
    if (promise === undefined) {
      promise = $q;
    }

    return function(response) {
      // 422 = validation error (e.g. incorrect password)
      if (response.status === 422) {
        return promise.reject(response.data.errors);
      } else {
        // Some other error
        return promise.reject();
      }
    };
  }

  /**
   * Log the user in.
   *
   * @param {Object} credentials - object with the login credentials.
   * @returns {Object} - a promise that is resolved with the logged in user.
   */
  function login(credentials) {
    var deferred = $q.defer();

    adapter.post('/login', {}, credentials)
      .then(function(response) {
        var userId = response.data.userId;
        var token = response.data.token;

        session.setToken(token);

        return store.findOne('users', userId)
          .then(function(user) {
            session.login(user);
            deferred.resolve(user);
          })
          .catch(function() {
            deferred.reject();
          });
      })
      .catch(errorHandler(deferred));

    return deferred.promise;
  }

  /**
   * Logout the user.
   *
   * @param {Boolean} forced - true if the user was automatically logged out.
   * @returns {Object} - a promise that is resolved when the user is logged out.
   */
  function logout(forced) {
    var deferred = $q.defer();

    // Logged in and not already logging out
    if (session.isAuthenticated && !loggingOut) {
      loggingOut = true;

      adapter.post('/logout').finally(function() {
        loggingOut = false;
        deferred.resolve();
      });

      session.logout(forced);
    } else {
      deferred.resolve();
    }

    return deferred.promise;
  }

  /**
   * Request a username reminder.
   *
   * @param {String} email - the email to get the username for.
   * @returns {Object} - a promise that is resolved when the username reminder has been successfully requested.
   */
  function forgotUsername(email) {
    var data = {
      email: email
    };

    return adapter.post('/forgot-username', {}, data).catch(errorHandler());
  }

  /**
   * Request a reset password link.
   *
   * @param {String} username - the username to reset the password for.
   * @param {String} email - the email to reset the password for.
   * @returns {Object} - a promise that is resolved when the password reset has been successfully requested.
   */
  function forgotPassword(username, email) {
    var data = {
      username: username,
      email: email
    };

    return adapter.post('/forgot-password', {}, data).catch(errorHandler());
  }

  /**
   * Reset a password.
   *
   * @param {String} token - the reset password token (from the URL).
   * @param {String} username - the username of the account.
   * @param {String} password - the new password.
   * @returns {Object} - a promise is resolved when the password has been successfully updated.
   */
  function resetPassword(token, username, password) {
    var data = {
      token: token,
      username: username,
      password: password
    };

    return adapter.post('/reset-password', {}, data).catch(errorHandler());
  }
}

authService.$inject = [
  'session',
  '$q',
  'store',
  'adapter'
];

export default authService;
