function consultantModelFactory(Model) {
  function ConsultantModel(modelName, data) {
    if (data.groups === undefined) {
      // Default groups to an empty list
      data.groups = [];
    }

    Model.call(this, modelName, data);
  }

  ConsultantModel.prototype = Object.create(Model.prototype);

  /**
   * Convert a consultant to a string.
   *
   * @returns {string} - a string repesentation of the consulant.
   */
  ConsultantModel.prototype.toString = function() {
    return this.firstName + ' ' + this.lastName + ' (' + this.specialty.name + ')';
  };

  return ConsultantModel;
}

consultantModelFactory.$inject = ['Model'];

export default consultantModelFactory;
