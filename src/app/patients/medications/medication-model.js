function medicationModelFactory(Model) {
  function MedicationModel(modelName, data) {
    Model.call(this, modelName, data);
  }

  MedicationModel.prototype = Object.create(Model.prototype);

  /** Returns the drug name (coded drug takes precedence). */
  MedicationModel.prototype.getDrug = function() {
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

  /** Returns the drug dose (coded dose takes precedence). */
  MedicationModel.prototype.getDose = function() {
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

  return MedicationModel;
}

medicationModelFactory.$inject = ['Model'];

export default medicationModelFactory;
