function randomPassword(adapter) {
  /**
   * Generate a random password on the server.
   *
   * Older browsers don't have the Web Cryptography API
   * which makes it hard to generate cryptographically
   * secure passwords client-side.
   *
   * @returns {Object} - a promise.
   */
  return function randomPassword() {
    return adapter.get('/random-password').then(function(response) {
      return response.data.password;
    });
  };
}

randomPassword.$inject = ['adapter'];

export default randomPassword;
