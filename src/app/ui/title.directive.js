(function() {
  'use strict';

  var app = angular.module('radar.ui');

  app.directive('title', ['titleService', function(titleService) {
    return {
      scope: true,
      restrict: 'E',
      template: '{{title}}',
      link: function(scope) {
        titleService.watch(function(title) {
          scope.title = title;
        });
      }
    };
  }]);
})();
