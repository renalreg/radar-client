(function() {
  'use strict';

  var app = angular.module('radar.account');

  app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('account', {
      url: '/account',
      templateUrl: 'app/account/account.html'
    });
  }]);
})();