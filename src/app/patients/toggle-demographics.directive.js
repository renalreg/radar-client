import templateUrl from './toggle-demographics.html';

function toggleDemographics(toggleDemographicsService) {
  return {
    scope: true,
    templateUrl: templateUrl,
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
}

toggleDemographics.$inject = ['toggleDemographicsService'];

export default toggleDemographics;
