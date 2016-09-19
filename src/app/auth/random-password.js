function randomPassword(adapter) {
  return function randomPassword() {
    return adapter.get('/random-password').then(function(response) {
      return response.data.password;
    });
  };
}

randomPassword.$inject = ['adapter'];

export default randomPassword;
