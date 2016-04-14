(function() {
  'use strict';

  var app = angular.module('radar.patients');

  app.directive('toggleDemographics', ['toggleDemographicsService', function(toggleDemographicsService) {
    return {
      scope: true,
      templateUrl: 'app/patients/toggle-demographics.html',
      link: function(scope) {
        scope.visible = toggleDemographicsService.isVisible();

        scope.toggle = function() {
          toggleDemographicsService.toggle();
        };

        var unsubscribe = toggleDemographicsService.listen(function(value) {
          scope.visible = value;
        });

        scope.$on('$destroy', unsubscribe);
      }
    };
  }]);
})();
