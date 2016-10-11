/** Directive to add the "if-demographics-visible" CSS class to an element when demographics are visible. */
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
