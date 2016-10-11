function authStore(localStorageService) {
  /**
   * Service for storing user credentials (e.g tokens).
   *
   * Data is stored in the browser's local storage. In older browsers that
   * don't implement the local storage API the data is stored in a cookie
   * instead.
   */
  return {
    logout: logout,
    setToken: setToken,
    setUserId: setUserId,
    getToken: getToken,
    getUserId: getUserId
  };

  /**
   * Removes the user ID and token.
   *
   * @returns {undefined}
   */
  function logout() {
    localStorageService.remove('userId');
    localStorageService.remove('token');
  }

  /**
   * Sets the token.
   *
   * @param {String} token - Session token.
   * @returns {undefined}
   */
  function setToken(token) {
    localStorageService.set('token', token);
  }

  /**
   * Sets the user ID.
   *
   * @param {Number} userId - User ID.
   * @returns {undefined}
   */
  function setUserId(userId) {
    localStorageService.set('userId', userId);
  }

  /**
   * Gets the session token.
   *
   * @return {String} Session token.
   */
  function getToken() {
    return localStorageService.get('token');
  }

  /**
   * Gets the user ID.
   *
   * @return {Number} User ID.
   */
  function getUserId() {
    var userId = localStorageService.get('userId');

    if (userId) {
      userId = parseInt(userId);
    }

    return userId;
  }
}

authStore.$inject = ['localStorageService'];

export default authStore;
