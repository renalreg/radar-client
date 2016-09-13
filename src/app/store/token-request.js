function tokenRequestFactory(session) {
  return function(config) {
    var token = session.getToken();

    if (token !== null) {
      if (config.headers === undefined) {
        config.headers = {};
      }

      // Send the token in the header
      config.headers['X-Auth-Token'] = token;
    }

    return config;
  };
}

tokenRequestFactory.$inject = ['session'];

export default tokenRequestFactory;