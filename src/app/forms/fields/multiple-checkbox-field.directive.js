(function() {
  'use strict';

  var app = angular.module('radar.forms.fields');

  // TODO pass optionsId and optionsLabel to directive
  app.directive('frmMultipleCheckboxField', function() {
    return {
      restrict: 'A',
      scope: {
        required: '&',
        model: '=',
        options: '=',
        optionsId: '@',
        optionsLabel: '@',
      },
      template: '<div frm-model frm-required multiple-checkbox ng-model="model" options="options" ng-required="required()"></div>'
    };
  });
})();
