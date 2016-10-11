/**
 * Directive to add the "if-demographics-visible" CSS class to an element when demographics are visible.
 *
 * @param {Object} toggleDemographicsService - injected service.
 * @returns {Object} - a directive.
 */
function ifDemographicsVisible(toggleDemographicsService) {
  return {
    link: function(scope, element) {
      update(toggleDemographicsService.isVisible());

      var unsubscribe = toggleDemographicsService.listen(update);

      // Call unsubscribe to avoid memory leaks
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
