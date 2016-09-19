import templateUrl from './select-field.html';

function frmSelectField(toSelectModel, toSelectView, wrapSelectOptions) {
  return {
    restrict: 'A',
    scope: {
      required: '&',
      model: '=',
      options: '=',
      optionsId: '@',
      optionsLabel: '@',
    },
    templateUrl: templateUrl,
    link: function(scope) {
      scope.data = {};

      scope.$watch('model', function(value) {
        scope.data.model = toSelectView(value, scope.optionsId, scope.optionsLabel);
      });

      scope.$watch('data.model', function(value) {
        scope.model = toSelectModel(value);
      });

      scope.$watchCollection('options', function(options) {
        scope.data.options = wrapSelectOptions(options, scope.optionsId, scope.optionsLabel);
      });
    }
  };
}

frmSelectField.$inject = ['toSelectModel', 'toSelectView', 'wrapSelectOptions'];

export default frmSelectField;
