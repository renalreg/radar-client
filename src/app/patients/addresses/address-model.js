function patientAddressModelFactory(Model) {
  function PatientAddressModel(modelName, data) {
    Model.call(this, modelName, data);
  }

  PatientAddressModel.prototype = Object.create(Model.prototype);

  PatientAddressModel.prototype.getAddress = function(demographics) {
    if (demographics === undefined) {
      demographics = true;
    }

    var lines = [];

    if (demographics) {
      if (this.address1) {
        lines.push(this.address1);
      }

      if (this.address2) {
        lines.push(this.address2);
      }

      if (this.address3) {
        lines.push(this.address3);
      }

      if (this.address4) {
        lines.push(this.address4);
      }

      if (this.postcode) {
        lines.push(this.postcode);
      }

      if (this.country) {
        lines.push(this.country.label);
      }
    } else {
      if (this.postcode) {
        // Postcode parts should be separated by a space but limit to first 4 charcters just in case
        var area = this.postcode.split(' ')[0].substring(0, 4);
        lines.push(area);
      }
    }

    return lines.join(',\n');
  };

  return PatientAddressModel;
}

patientAddressModelFactory.$inject = ['Model'];

export default patientAddressModelFactory;
