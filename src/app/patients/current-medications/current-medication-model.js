function currentMedicationModelFactory(Model) {
  function CurrentMedicationModel(modelName, data) {
    Model.call(this, modelName, data);
  }

  CurrentMedicationModel.prototype = Object.create(Model.prototype);

  /**
   * Returns the drug name (coded drug takes precedence).
   *
   * @returns {string} - the name of the drug.
   */
  CurrentMedicationModel.prototype.getDrug = function() {
    var name;

    if (this.drug) {
      name = this.drug.name;

      if (this.drug.drugGroup) {
        name += ' (' + this.drug.drugGroup.name + ')';
      }
    } else {
      name = this.drugText;
    }

    return name;
  };

  /**
   * Returns the drug dose (coded dose takes precedence).
   *
   * @returns {string} - the drug dose.
   */
  CurrentMedicationModel.prototype.getDose = function() {
    var dose;

    if (this.doseQuantity != null) {
      dose = this.doseQuantity;

      if (this.doseUnit) {
        dose = dose + ' ' + this.doseUnit.label;
      }
    } else {
      dose = this.doseText;
    }

    return dose;
  };

  return CurrentMedicationModel;
}

currentMedicationModelFactory.$inject = ['Model'];

export default currentMedicationModelFactory;
