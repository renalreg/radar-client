import angular from 'angular';

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
      e.attr(scope.form.data.multiple ? 'entries-component' : 'entry-component', '');
      element.append(e);
      $compile(e)(scope);
    }
  };
}

formComponent.$inject = ['$compile'];

export default formComponent;
