(function() {
  'use strict';

  var app = angular.module('radar.patients');

  app.directive('ifDemographicsVisible', ['toggleDemographicsService', function(toggleDemographicsService) {
    return {
      link: function(scope, element) {
        update(toggleDemographicsService.isVisible());

        var unsubscribe = toggleDemographicsService.listen(update);

        scope.$on('$destroy', unsubscribe);

        function update(visible) {
          if (visible) {
            element.removeClass('if-demographics-visible');
          } else {
            element.addClass('if-demographics-visible');
          }
        }
      }
    };
  }]);
})();
