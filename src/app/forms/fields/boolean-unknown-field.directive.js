import templateUrl from './boolean-unknown-field.html';

function frmBooleanUnknownField() {
  return {
    require: '^frmField',
    restrict: 'A',
    scope: {
      required: '&',
      model: '=',
    },
    templateUrl: templateUrl,
    link: function (scope) {
      scope.options = [
        {
          value: null,
          label: 'Unknown',
        },
        {
          value: true,
          label: 'Yes',
        },
        {
          value: false,
          label: 'No',
        },
      ];
    },
  };
}

export default frmBooleanUnknownField;
