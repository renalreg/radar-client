function consultantModelFactory(Model) {
  function ConsultantModel(modelName, data) {
    if (data.groups === undefined) {
      data.groups = [];
    }

    Model.call(this, modelName, data);
  }

  ConsultantModel.prototype = Object.create(Model.prototype);

  ConsultantModel.prototype.toString = function() {
    return this.firstName + ' ' + this.lastName + ' (' + this.specialty.name + ')';
  };

  return ConsultantModel;
}

consultantModelFactory.$inject = ['Model'];

export default consultantModelFactory;
