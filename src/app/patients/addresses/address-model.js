/**
 * Get the outward code part of the postcode.
 *
 * For example the "PO1" part of "PO1 3AX".
 */
function getOutwardCode(postcode) {
  // Expects the outward code and the inward code to be separated by a space
  // For example "PO1 3AX" not "PO13AX"
  // The result is limited to 4 charcters just in case
  return postcode.split(' ')[0].substring(0, 4);
}

function patientAddressModelFactory(Model) {
  function PatientAddressModel(modelName, data) {
    Model.call(this, modelName, data);
  }

  PatientAddressModel.prototype = Object.create(Model.prototype);

  /** Format the address as a paragraph. */
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
    } else {
      if (this.postcode) {
        lines.push(getOutwardCode(this.postcode));
      }
    }

    if (this.country) {
      lines.push(this.country.label);
    }

    return lines.join(',\n');
  };

  return PatientAddressModel;
}

patientAddressModelFactory.$inject = ['Model'];

export default patientAddressModelFactory;
