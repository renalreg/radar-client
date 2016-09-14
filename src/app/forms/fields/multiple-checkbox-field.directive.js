// TODO pass optionsId and optionsLabel to directive
function frmMultipleCheckboxField() {
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
}

export default frmMultipleCheckboxField;
