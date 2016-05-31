(function() {
  'use strict';

  var app = angular.module('radar.forms');

  app.directive('multipleCheckbox', ['wrapSelectOptions', '_', function(wrapSelectOptions, _) {
    return {
      require: 'ngModel',
      scope: {
        options: '=',
        optionsId: '@',
        optionsLabel: '@'
      },
      template: '<div ng-repeat="option in localOptions"><input ng-model="selected[option.id]" type="checkbox" ng-change="update()" /> {{option.label}}',
      link: function(scope, element, attrs, ngModel) {
        scope.selected = {};
        scope.localOptions = [];

        ngModel.$isEmpty = function(value) {
          // Treat empty list as empty
          return !value || value.length == 0;
        };

        // Called when the model is updated
        ngModel.$render = function() {
          var selected = ngModel.$viewValue || [];

          // Update the selected options
          _.forEach(scope.localOptions, function(option) {
            scope.selected[option.id] = _.includes(selected, option.value);
          });
        };

        // Watch for changes to the list of options
        scope.$watchCollection('options', function(options) {
          // Wrap the options
          scope.localOptions = wrapSelectOptions(options, scope.optionsId, scope.optionsLabel);
        });

        // An option was selected
        scope.update = function() {
          var selected = [];

          // Find all of the selected options
          _.forEach(scope.localOptions, function(option) {
            if (scope.selected[option.id]) {
              selected.push(option.value);
            }
          });

          // Update the model
          ngModel.$setViewValue(selected);
        }
      }
    };
  }]);
})();
