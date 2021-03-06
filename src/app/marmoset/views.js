import angular from 'angular';

function marmosetView($compile) {
  return {
    scope: {
      field: '=marmosetView'
    },
    link: function(scope, element) {
      var directive = scope.field.getView();
      var e = angular.element('<div></div>');
      e.attr(directive, 'field');
      element.append(e);
      $compile(e)(scope);
    }
  };
}

marmosetView.$inject = ['$compile'];

function marmosetBasicView($compile) {
  return {
    scope: {
      field: '=marmosetBasicView'
    },
    link: function(scope, element) {
      var e = angular.element('<span></span>');

      if (scope.field.options) {
        e.text('{{field.display() | missing}}');
      } else if (scope.field.type === 'date') {
        e.text('{{field.value() | dateFormat}}');
      } else if (scope.field.type === 'datetime') {
        e.text('{{field.value() | dateTimeFormat}}');
      } else if (scope.field.type === 'boolean') {
        e.attr('tick', 'field.value()');
      } else {
        e.text('{{field.display() | missing}}');
      }

      element.append(e);
      $compile(e)(scope);
    }
  };
}

marmosetBasicView.$inject = ['$compile'];

export {
  marmosetView,
  marmosetBasicView
};
