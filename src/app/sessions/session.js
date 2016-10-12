import _ from 'lodash';

function sessionFactory(authStore, $rootScope) {
  /**
   * Object representing a user session.
   *
   * A session is started when the user logs in (see the login method).
   * The session comprises of a user and a token. A user is given a token
   * when they login and a fresh token is included with each API response.
   * A session ends when the user logs out (see the logout method).
   *
   * The session object stores the current user object while persistent
   * storage of the user ID and token is handled by the authStore.
   *
   * @class
   */
  function Session() {
    this.setUser(null);
    this.callbacks = {};
  }

  /**
   * Login as a user.
   *
   * @param {Object} user - User.
   * @returns {undefined}
   */
  Session.prototype.login = function(user) {
    this.setUserId(user.id);
    this.setUser(user);
    this.broadcast('login');
  };

  /**
   * Logout the current user.
   *
   * @param {boolean} forced - True if the user was forced to logout (e.g. their token expired).
   * @returns {undefined}
   */
  Session.prototype.logout = function(forced) {
    if (forced === undefined) {
      forced = false;
    }

    var userId = this.getUserId();

    // Logged in
    if (userId !== null) {
      authStore.logout();
      this.setUser(null);

      this.broadcast('logout', {
        userId: userId,
        forced: forced
      });
    }
  };

  /**
   * Get the current session token.
   *
   * @return {string} token - Session token.
   */
  Session.prototype.getToken = function() {
    return authStore.getToken();
  };

  /**
   * Update the session token.
   *
   * The user is given a token when they login and a fresh token with each
   * API response.
   *
   * @param {string} token - Session token.
   * @returns {undefined}
   */
  Session.prototype.setToken = function(token) {
    authStore.setToken(token);
    this.broadcast('refresh');
  };

  /**
   * Gets the ID of the current user.
   *
   * Note: this may be called before the current user has been loaded so it
   * gets the ID from the authStore directly rather than using the user
   * property.
   *
   * @return {number} ID of the current user.
   */
  Session.prototype.getUserId = function() {
    return authStore.getUserId();
  };

  /**
   * Sets the current user ID.
   *
   * This shouldn't be used directly, use the login method instead.
   *
   * @param {number} id - used ID.
   * @returns {undefined}
   */
  Session.prototype.setUserId = function(id) {
    authStore.setUserId(id);
  };

  /**
   * Get the current user.
   *
   * @returns {Object} - current user.
   */
  Session.prototype.getUser = function() {
    return this.user;
  };

  /**
   * Sets the current user and the isAuthenticated flag.
   *
   * Called when the user logs in.
   *
   * @param {Object} user - User.
   * @returns {undefined}
   */
  Session.prototype.setUser = function(user) {
    this.user = user;
    $rootScope.user = user; // TODO decouple session from $rootScope

    var isAuthenticated = user !== null;
    this.isAuthenticated = isAuthenticated;
    $rootScope.isAuthenticated = isAuthenticated;
  };

  /**
   * Runs the callback functions for an event.
   *
   * There are three events: login, logout and refresh.
   *
   * @param {string} name - Name of the event (e.g. login).
   * @returns {undefined}
   */
  Session.prototype.broadcast = function(name) {
    var self = this;

    var callbacks = self.callbacks[name] || [];
    var args = Array.prototype.slice.call(arguments, 1);

    _.forEach(callbacks, function(callback) {
      callback.apply(self, args);
    });
  };

  /**
    * Registers a callback function for an event.
    *
    * @param {string} name - Name of the event (e.g. login).
    * @param {function} callback - Function to be called when the event happens.
    * @returns {undefined}
    */
  Session.prototype.on = function(name, callback) {
    if (this.callbacks[name] === undefined) {
      this.callbacks[name] = [];
    }

    this.callbacks[name].push(callback);
  };

  return new Session();
}

sessionFactory.$inject = ['authStore', '$rootScope'];

export default sessionFactory;
