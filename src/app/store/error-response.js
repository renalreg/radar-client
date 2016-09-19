function errorResponseFactory($q, notificationService) {
  return function(promise) {
    return promise['catch'](function(response) {
      if (response.status === 0) {
        notificationService.fatal({
          title: 'Connection Problem',
          message: 'Unable to connect to the server. Please check your internet connection and then try reloading the page.'
        });
      } else if (response.status === 500 || response.status === 502) {
        notificationService.fatal();
      }

      return $q.reject(response);
    });
  };
}

errorResponseFactory.$inject = ['$q', 'notificationService'];

export default errorResponseFactory;
