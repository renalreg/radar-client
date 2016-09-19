function frmModel() {
  return {
    require: ['^frmField', 'ngModel'],
    link: function(scope, element, attrs, ctrls) {
      var fieldCtrl = ctrls[0];
      var ngModelCtrl = ctrls[1];
      fieldCtrl.setModelCtrl(ngModelCtrl);
    }
  };
}

export default frmModel;
