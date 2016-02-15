(function() {
  'use strict';

  var app = angular.module('radar.patients');

  app.directive('ifDemographicsHidden', ['toggleDemographicsService', function(toggleDemographicsService) {
    return {
      link: function(scope, element) {
        update(toggleDemographicsService.isHidden());

        toggleDemographicsService.listen(function(value) {
          update(!value);
        });

        function update(hidden) {
          console.log('hidden = ', hidden);

          if (hidden) {
            element.removeClass('if-demographics-hidden');
          } else {
            element.addClass('if-demographics-hidden');
          }
        }
      }
    };
  }]);
})();
