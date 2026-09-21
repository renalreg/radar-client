import templateUrl from './boolean-field.html';

function frmBooleanField() {
  return {
    require: '^frmField',
    restrict: 'A',
    scope: {
      required: '&',
      model: '='
    },
    template: templateUrl,
    link: function(scope) {
      scope.options = [
        {
          value: true,
          label: 'Yes'
        },
        {
          value: false,
          label: 'No'
        }
      ];
    }
  };
}

export default frmBooleanField;
