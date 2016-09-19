function frmStatus() {
  return {
    require: '^frmField',
    link: function(scope, element, attrs, fieldCtrl) {
      scope.$watch(function() {
        return fieldCtrl.isValid();
      }, function(valid) {
        if (valid) {
          element.removeClass('has-error');
        } else {
          element.addClass('has-error');
        }
      });
    }
  };
}

export default frmStatus;
