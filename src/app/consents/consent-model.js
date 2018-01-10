function consentModelFactory(Model) {
  function ConsentModel(modelName, data) {
    Model.call(this, modelName, data);
  }

  ConsentModel.prototype = Object.create(Model.prototype);

  /**
   * Convert a consent to a string.
   *
   * @returns {string} - a string repesentation of the consent.
   */
  ConsentModel.prototype.toString = function() {
    return this.label;
    // return this.firstName + ' ' + this.lastName + ' (' + this.specialty.name + ')';
  };

  return ConsentModel;
}

consentModelFactory.$inject = ['Model'];

export default consentModelFactory;
