(function() {
  'use strict';

  var app = angular.module('radar.patients.diagnoses');

  app.factory('PatientDiagnosisModel', ['Model', function(Model) {
    function PatientDiagnosisModel(modelName, data) {
      Model.call(this, modelName, data);
    }

    PatientDiagnosisModel.prototype = Object.create(Model.prototype);

    PatientDiagnosisModel.prototype.getDiagnosis = function() {
      var r;

      if (this.diagnosis) {
        r = this.diagnosis.name;
      } else {
        r = this.diagnosisText;
      }

      return r;
    };

    return PatientDiagnosisModel;
  }]);
})();
