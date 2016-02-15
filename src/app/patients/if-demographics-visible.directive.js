(function() {
  'use strict';

  var app = angular.module('radar.patients');

  app.directive('ifDemographicsVisible', ['toggleDemographicsService', function(toggleDemographicsService) {
    return {
      link: function(scope, element) {
        update(toggleDemographicsService.isVisible());

        toggleDemographicsService.listen(update);

        function update(visible) {
          console.log('visible = ', visible);

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
