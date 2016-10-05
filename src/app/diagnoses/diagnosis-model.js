import _ from 'lodash';

function diagnosisModelFactory(Model) {
  function DiagnosisModel(modelName, data) {
    Model.call(this, modelName, data);
  }

  DiagnosisModel.prototype = Object.create(Model.prototype);

  DiagnosisModel.prototype.getSystemCodes = function(system) {
    return _.filter(this.codes, function(x) {
      return x.system === system;
    });
  };

  DiagnosisModel.prototype.getEdtaCode = function() {
    var codes = this.getSystemCodes('ERA-EDTA PRD');

    if (codes.length) {
      return parseInt(codes[0].code);
    } else {
      return null;
    }
  };

  DiagnosisModel.prototype.getEdtaCodes = function() {
    var codes = this.getSystemCodes('ERA-EDTA PRD');

    return _.join(_.map(codes, 'code'), ', ') || '-';
  };

  return DiagnosisModel;
}

diagnosisModelFactory.$inject = ['Model'];

export default diagnosisModelFactory;
