function ifDemographicsVisible(toggleDemographicsService) {
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
}

ifDemographicsVisible.$inject = ['toggleDemographicsService'];

export default ifDemographicsVisible;
