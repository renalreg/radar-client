import _ from 'lodash';

function filterGroupPatientsByType(groupPatients, groupType) {
  return _.filter(groupPatients, function(x) {
    return x.group.type === groupType;
  });
}

function filterGroupPatientsByCurrent(groupPatients) {
  return _.filter(groupPatients, function(x) {
    return x.current;
  });
}

function uniqueGroups(groupPatients) {
  var groups = _.map(groupPatients, function(x) {
    return x.group;
  });

  groups = _.uniqBy(groups, 'id');

  return groups;
}

function patientModelFactory(Model, store) {
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

  PatientModel.prototype.getName = function(demographics) {
    if (demographics === undefined) {
      demographics = true;
    }

    if (demographics && this.firstName && this.lastName) {
      return this.firstName + ' ' + this.lastName;
    } else if (this.getId() !== null) {
      return 'Patient #' + this.getId();
    } else {
      return 'New Patient';
    }
  };

  /** Get memberships for hospital groups. */
  PatientModel.prototype.getHospitalPatients = function() {
    return filterGroupPatientsByType(this.groups, 'HOSPITAL');
  };

  /** Get memberships for cohort groups. */
  PatientModel.prototype.getCohortPatients = function() {
    return filterGroupPatientsByType(this.groups, 'COHORT');
  };

  /** Get current memberships (using from and to date) for hospital groups. */
  PatientModel.prototype.getCurrentHospitalPatients = function() {
    return filterGroupPatientsByCurrent(this.getHospitalPatients());
  };

  /** Get current memberships (using from and to date) for cohort groups. */
  PatientModel.prototype.getCurrentCohortPatients = function() {
    return filterGroupPatientsByCurrent(this.getCohortPatients());
  };

  /** Get a list of unique cohorts. */
  PatientModel.prototype.getCohorts = function() {
    return uniqueGroups(this.getCohortPatients());
  };

  /** Get a list of unique hosptials. */
  PatientModel.prototype.getHospitals = function() {
    return uniqueGroups(this.getHospitalPatients());
  };

  /** Get a list of unique groups. */
  PatientModel.prototype.getGroups = function() {
    return uniqueGroups(this.groups);
  };

  /** Get a list of unique cohorts with a current membership. */
  PatientModel.prototype.getCurrentCohorts = function() {
    return uniqueGroups(this.getCurrentCohortPatients());
  };

  /** Get a list of unique hosptials with a current membership. */
  PatientModel.prototype.getCurrentHospitals = function() {
    return uniqueGroups(this.getCurrentHospitalPatients());
  };

  /** Get the earliest from date for the specified group.,= */
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
