import angular from 'angular';

/**
 * Directive for viewing and editing form entries.
 *
 * @param {function} $compile - injected function.
 * @returns {Object} - a directive.
 */
function formComponent($compile) {
  return {
    scope: {
      patient: '=',
      form: '='
    },
    link: function(scope, element) {
      var e = angular.element('<div></div>');
      e.attr('patient', 'patient');
      e.attr('form', 'form');
      // The type of directive depends on whether or not the form allows multiple entries
      e.attr(scope.form.data.multiple ? 'entries-component' : 'entry-component', '');
      element.append(e);
      $compile(e)(scope);
    }
  };
}

formComponent.$inject = ['$compile'];

export default formComponent;
