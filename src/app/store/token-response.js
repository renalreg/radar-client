function tokenResponseFactory(session) {
  return function(promise) {
    return promise.then(function(response) {
      // Fresh token from the server
      var token = response.headers('X-Auth-Token');

      if (token !== null) {
        // Use the fresh token for future requests
        session.setToken(token);
      }

      return response;
    });
  };
}

tokenResponseFactory.$inject = ['session'];

export default tokenResponseFactory;