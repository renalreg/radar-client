/**
 * Directive to add the "if-demographics-hidden" CSS class to an element when demographics are hidden.
 *
 * @param {Object} toggleDemographicsService - injected service.
 * @returns {Object} - a directive.
 */
function ifDemographicsHidden(toggleDemographicsService) {
  return {
    link: function(scope, element) {
      update(toggleDemographicsService.isHidden());

      var unsubscribe = toggleDemographicsService.listen(function(value) {
        update(!value);
      });

      // Call unsubscribe to avoid memory leaks
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
