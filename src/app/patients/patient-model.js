import _ from 'lodash';

/**
 * Filter group patients by group type.
 *
 * @param {array} groupPatients - list of group memberships.
 * @param {string} groupType - type of group.
 * @returns {array} - memberships of groups of the specified type.
 */
function filterGroupPatientsByType(groupPatients, groupType) {
  return _.filter(groupPatients, function(x) {
    return x.group.type === groupType;
  });
}

/**
 * Filter group patients to only include current memberships.
 *
 * A membership is current if todays date is between the from and to date.
 *
 * @param {array} groupPatients - list of group memberships.
 * @returns {array} - current group memberships.
 */
function filterGroupPatientsByCurrent(groupPatients) {
  return _.filter(groupPatients, function(x) {
    return x.current;
  });
}

/**
 * Get a unique list of groups the patient is a member of.
 *
 * @param {array} groupPatients - list of group memberships.
 * @returns {array} - unique list of groups.
 */
function uniqueGroups(groupPatients) {
  var groups = _.map(groupPatients, function(x) {
    return x.group;
  });

  groups = _.uniqBy(groups, 'id');

  return groups;
}

function patientModelFactory(Model, store) {
  /**
   * Model to represent a patient.
   *
   * @class
   * @param {string} modelName - name of the model.
   * @param {Object} data - the instance data.
   */
  function PatientModel(modelName, data) {
    var i;

    if (data.groups !== undefined) {
      var groups = [];

      for (i = 0; i < data.groups.length; i++) {
        var rawGroup = data.groups[i];

        // Create the group patient models
        groups.push(store.pushToStore(new Model('group-patients', rawGroup)));
      }

      data.groups = groups;
    }

    Model.call(this, modelName, data);
  }

  PatientModel.prototype = Object.create(Model.prototype);

  /**
   * Get the patient's name.
   *
   * Returns an anonymised name if demographics is false.
   *
   * @param {boolean} demographics - if true the patient's name is displayed.
   * @returns {string} - the patient's name.
   */
  PatientModel.prototype.getName = function(demographics) {
    if (demographics === undefined) {
      demographics = true;
    }

    // If the user doesn't have access to patient demographics
    // the first name and last name properties will be undefined
    if (demographics && this.firstName && this.lastName) {
      return this.firstName + ' ' + this.lastName;
    } else if (this.getId() !== null) {
      return 'Patient #' + this.getId();
    } else {
      return 'New Patient';
    }
  };

  /**
   * Get memberships for hospital groups.
   *
   * @returns {array} - a list of hospital memberships.
   */
  PatientModel.prototype.getHospitalPatients = function() {
    return filterGroupPatientsByType(this.groups, 'HOSPITAL');
  };

  /**
   * Get memberships for cohort groups.
   *
   * @returns {array} - a list of cohort memberships.
   */
  PatientModel.prototype.getCohortPatients = function() {
    return filterGroupPatientsByType(this.groups, 'COHORT');
  };

  /**
   * Get current memberships (using from and to date) for hospital groups.
   *
   * @returns {array} - a list of current hospital memberships.
   */
  PatientModel.prototype.getCurrentHospitalPatients = function() {
    return filterGroupPatientsByCurrent(this.getHospitalPatients());
  };

  /**
   * Get current memberships (using from and to date) for cohort groups.
   *
   * @returns {array} - a list of current cohort memberships.
   */
  PatientModel.prototype.getCurrentCohortPatients = function() {
    return filterGroupPatientsByCurrent(this.getCohortPatients());
  };

  /**
   * Get a list of unique cohorts.
   *
   * @returns {array} - a unique list of cohorts the patient is a member of.
   */
  PatientModel.prototype.getCohorts = function() {
    return uniqueGroups(this.getCohortPatients());
  };

  /**
   * Get a list of unique hosptials.
   *
   * @returns {array} - a unique list of hospitals the patient is a member of.
   */
  PatientModel.prototype.getHospitals = function() {
    return uniqueGroups(this.getHospitalPatients());
  };

  /**
   * Get a list of unique groups.
   *
   * @returns {array} - a unique list of groups the patient is a member of.
   */
  PatientModel.prototype.getGroups = function() {
    return uniqueGroups(this.groups);
  };

  /**
   * Get a list of unique cohorts with a current membership.
   *
   * @returns {array} - a unique list of cohorts the patient is a current member of.
   */
  PatientModel.prototype.getCurrentCohorts = function() {
    return uniqueGroups(this.getCurrentCohortPatients());
  };

  /**
   * Get a list of unique hosptials with a current membership.
   *
   * @returns {array} - a unique list of hospitals the patient is a current member of.
   * */
  PatientModel.prototype.getCurrentHospitals = function() {
    return uniqueGroups(this.getCurrentHospitalPatients());
  };

  /**
   * Get the earliest from date for the specified group.
   *
   * @param {Object} group - a group.
   * @returns {string} - the earliest from date.
   */
  PatientModel.prototype.getFromDate = function(group) {
    var fromDate = null;

    // Find the earliest from date for this group
    for (var i = 0; i < this.groups.length; i++) {
      var currentGroup = this.groups[i];

      // Membership is for the specified group and is earlier than the current from date
      if (currentGroup.group.id === group.id && (fromDate === null || currentGroup.fromDate < fromDate)) {
        fromDate = currentGroup.fromDate;
      }
    }

    return fromDate;
  };

  return PatientModel;
}

patientModelFactory.$inject = ['Model', 'store'];

export default patientModelFactory;
