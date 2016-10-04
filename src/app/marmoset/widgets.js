import angular from 'angular';

function withUnit(element, field) {
  if (!field.unit) {
    return element;
  }

  var group = angular.element('<div></div>');
  group.attr('class', 'input-group');

  group.append(element);

  var addon = angular.element('<div></div>');
  addon.attr('class', 'input-group-addon');
  addon.text(field.unit);
  group.append(addon);

  return group;
}

function marmosetWidget($compile) {
  return {
    scope: {
      field: '=marmosetWidget'
    },
    link: function(scope, element) {
      // Anything that uses ng-model must be compiled *after* being added
      // to the DOM otherwise it won't be able to find the form controller.
      var directive = scope.field.getWidget();
      var e = angular.element('<div></div>');
      e.attr(directive, 'field');
      element.append(e);
      $compile(e)(scope);
    }
  };
}

marmosetWidget.$inject = ['$compile'];

function marmosetIntWidget($compile) {
  return {
    scope: {
      field: '=marmosetIntWidget'
    },
    link: function(scope, element) {
      var e = angular.element('<input />');
      e.attr('class', 'form-control');
      e.attr('integer-validator', '');
      e.attr('name', scope.field.name);
      e.attr('type', 'text');
      e.attr('ng-model', 'field.data[field.name]');
      e.attr('ng-required', 'field.required()');
      e = withUnit(e, scope.field);
      element.append(e);
      $compile(e)(scope);
    }
  };
}

marmosetIntWidget.$inject = ['$compile'];

function marmosetStringWidget($compile) {
  return {
    scope: {
      field: '=marmosetStringWidget'
    },
    link: function(scope, element) {
      var e = angular.element('<input />');
      e.attr('class', 'form-control');
      e.attr('name', scope.field.name);
      e.attr('type', 'text');
      e.attr('ng-model', 'field.data[field.name]');
      e.attr('ng-required', 'field.required()');
      element.append(e);
      $compile(e)(scope);
    }
  };
}

marmosetStringWidget.$inject = ['$compile'];

function marmosetDateWidget($compile) {
  return {
    scope: {
      field: '=marmosetDateWidget'
    },
    link: function(scope, element) {
      var e = angular.element('<input />');
      e.attr('class', 'form-control');
      e.attr('date-validator', '');
      e.attr('frm-date-picker', '');
      e.attr('name', scope.field.name);
      e.attr('type', 'text');
      e.attr('ng-model', 'field.data[field.name]');
      e.attr('ng-required', 'field.required()');
      element.append(e);
      $compile(e)(scope);
    }
  };
}

marmosetDateWidget.$inject = ['$compile'];

function marmosetFloatWidget($compile) {
  return {
    scope: {
      field: '=marmosetFloatWidget'
    },
    link: function(scope, element) {
      var e = angular.element('<input />');
      e.attr('class', 'form-control');
      e.attr('number-validator', '');
      e.attr('name', scope.field.name);
      e.attr('type', 'text');
      e.attr('ng-model', 'field.data[field.name]');
      e.attr('ng-required', 'field.required()');
      e = withUnit(e, scope.field);
      element.append(e);
      $compile(e)(scope);
    }
  };
}

marmosetFloatWidget.$inject = ['compile'];

function marmosetSelectWidget($compile) {
  return {
    scope: {
      field: '=marmosetSelectWidget'
    },
    link: function(scope, element) {
      // TODO null option

      var e = angular.element('<select></select>');
      e.attr('class', 'form-control');
      e.attr('name', scope.field.name);
      e.attr('ng-model', 'field.data[field.name]');
      e.attr('ng-options', 'x.value as x.label for x in field.options');
      e.attr('ng-required', 'field.required()');
      element.append(e);
      $compile(e)(scope);
    }
  };
}

marmosetSelectWidget.$inject = ['$compile'];

function marmosetRadioWidget($compile) {
  return {
    scope: {
      field: '=marmosetRadioWidget'
    },
    link: function(scope, element) {
      var labelElement = angular.element('<label></label>');

      var inputElement = angular.element('<input />');
      inputElement.attr('name', scope.field.name);
      inputElement.attr('type', 'radio');
      inputElement.attr('ng-value', 'option.value');
      inputElement.attr('ng-model', 'field.data[field.name]');
      inputElement.attr('ng-required', 'field.required()');
      labelElement.append(inputElement);

      labelElement.append('{{option.label}}');

      var rootElement;

      if (scope.field.widget.inline) {
        labelElement.attr('class', 'radio-inline');
        labelElement.attr('ng-repeat', 'option in field.options');
        rootElement = labelElement;
      } else {
        var divElement = angular.element('<div></div>');
        divElement.attr('class', 'radio');
        divElement.attr('ng-repeat', 'option in field.options');
        divElement.append(labelElement);
        rootElement = divElement;
      }

      element.append(rootElement);
      $compile(rootElement)(scope);
    }
  };
}

marmosetRadioWidget.$inject = ['$compile'];

function marmosetYesNoRadioWidget($compile) {
  return {
    scope: {
      field: '=marmosetYesNoRadioWidget'
    },
    link: function(scope, element) {
      scope.options = [
        {value: true, label: 'Yes'},
        {value: false, label: 'No'},
        {value: null, label: 'Not Answered'}
      ];

      var divElement = angular.element('<div></div>');
      divElement.attr('class', 'radio');
      divElement.attr('ng-repeat', 'option in options');

      var labelElement = angular.element('<label></label>');
      divElement.append(labelElement);

      var inputElement = angular.element('<input />');
      inputElement.attr('name', scope.field.name);
      inputElement.attr('type', 'radio');
      inputElement.attr('ng-value', 'option.value');
      inputElement.attr('ng-model', 'field.data[field.name]');
      inputElement.attr('ng-required', 'field.required()');
      labelElement.append(inputElement);

      labelElement.append('{{option.label}}');

      element.append(divElement);
      $compile(divElement)(scope);
    }
  };
}

marmosetYesNoRadioWidget.$inject = ['$compile'];

function checkboxes() {
  return {
    require: '?ngModel',
    scope: {
      options: '='
    },
    template: function(element, attrs) {
      var content = '<input type="checkbox" ng-model="states[$index]" ng-change="update($index)" /> {{option.label}}';

      if (attrs.inline === 'true') {
        return '<label ng-repeat="option in options" class="checkbox-inline">' + content + '</label>';
      } else {
        return '<div ng-repeat="option in options" class="checkbox"><label>' + content + '</label></div>';
      }
    },
    link: function(scope, element, attr, ngModel) {
      if (!ngModel) {
        return;
      }

      function updateState() {
        var value = ngModel.$viewValue;
        var options = scope.options || [];

        for (var i = 0; i < options.length; i++) {
          scope.states[i] = options[i].value === value;
        }
      }

      scope.update = function(index) {
        var value = scope.states[index] ? scope.options[index].value : null;
        ngModel.$setViewValue(value);
        updateState();
      };

      scope.states = {};

      scope.$watch('options', updateState);
      ngModel.$render = updateState;
    }
  };
}

function marmosetCheckboxesWidget($compile) {
  return {
    scope: {
      field: '=marmosetCheckboxesWidget'
    },
    link: function(scope, element) {
      var e = angular.element('<div></div>');
      e.attr('checkboxes', '');
      e.attr('ng-model', 'field.data[field.name]');
      e.attr('ng-required', 'field.required()');
      e.attr('options', 'field.options');
      e.attr('inline', scope.field.widget.inline ? 'true' : 'false');
      element.append(e);
      $compile(e)(scope);
    }
  };
}

marmosetCheckboxesWidget.$inject = ['$compile'];

function marmosetStaticWidget($compile) {
  return {
    scope: {
      field: '=marmosetStaticWidget'
    },
    link: function(scope, element) {
      var e = angular.element('<p></p>');
      e.attr('class', 'form-control-static');

      if (scope.field.type === 'date') {
        e.text('{{field.value() | dateFormat}}');
      } else if (scope.field.type === 'datetime') {
        e.text('{{field.value() | dateTimeFormat}}');
      } else if (scope.field.type === 'boolean') {
        e.html('<span tick="field.value()"></span>');
      } else {
        e.text('{{field.value() | missing}}');
      }

      element.append(e);
      $compile(e)(scope);
    }
  };
}

marmosetStaticWidget.$inject = ['$compile'];

export {
  marmosetWidget,
  marmosetIntWidget,
  marmosetStringWidget,
  marmosetDateWidget,
  marmosetFloatWidget,
  marmosetSelectWidget,
  marmosetRadioWidget,
  marmosetYesNoRadioWidget,
  checkboxes,
  marmosetCheckboxesWidget,
  marmosetStaticWidget
};
