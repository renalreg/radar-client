import saveButtonTemplateUrl from './save-button.html';
import saveSubmitButtonTemplateUrl from './save-submit-button.html';

function crudSaveButton($parse) {
  return {
    require: ['^crud', '^form', '?^crudSubmit'],
    scope: {
      action: '&',
      text: '@'
    },
    templateUrl: function(element, attrs) {
      return attrs.action ? saveButtonTemplateUrl : saveSubmitButtonTemplateUrl;
    },
    link: function(scope, element, attrs, ctrls) {
      var crudCtrl = ctrls[0];
      var formCtrl = ctrls[1];
      var crudSubmitCtrl = ctrls[2];

      scope.submitting = false;

      scope.$watch(function() {
        return formCtrl.$valid;
      }, function(value) {
        scope.valid = value;
      });

      scope.$watch(function() {
        return crudCtrl.saveEnabled();
      }, function(value) {
        scope.enabled = value;
      });

      if (crudSubmitCtrl !== null) {
        crudSubmitCtrl.on('submitting', function(submitting) {
          scope.submitting = submitting;
        });
      }

      scope.click = function() {
        crudSubmitCtrl.submit(function() {
          return scope.action();
        });
      };
    }
  };
}

crudSaveButton.$inject = ['$parse'];

export default crudSaveButton;
