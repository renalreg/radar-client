function ifDemographicsHidden(toggleDemographicsService) {
  return {
    link: function(scope, element) {
      update(toggleDemographicsService.isHidden());

      var unsubscribe = toggleDemographicsService.listen(function(value) {
        update(!value);
      });

      scope.$on('$destroy', unsubscribe);

      function update(hidden) {
        if (hidden) {
          element.removeClass('if-demographics-hidden');
        } else {
          element.addClass('if-demographics-hidden');
        }
      }
    }
  };
}

ifDemographicsHidden.$inject = ['toggleDemographicsService'];

export default ifDemographicsHidden;
