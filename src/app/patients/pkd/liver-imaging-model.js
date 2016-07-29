(function() {
  'use strict';

  var app = angular.module('radar.patients.pkd');

  app.config(['storeProvider', function(storeProvider) {
    storeProvider.registerMixin('liver-imaging', 'SourceModelMixin');
  }]);
})();
