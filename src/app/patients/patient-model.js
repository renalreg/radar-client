(function() {
  'use strict';

  var app = angular.module('radar.patients');

  app.factory('PatientModel', ['Model', 'store', '_', function(Model, store, _) {
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

    function PatientModel(modelName, data) {
      var i;

      if (data.groups !== undefined) {
        var groups = [];

        for (i = 0; i < data.groups.length; i++) {
          var rawGroup = data.groups[i];
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

    PatientModel.prototype.getHospitalPatients = function() {
      return filterGroupPatientsByType(this.groups, 'HOSPITAL');
    };

    PatientModel.prototype.getCohortPatients = function() {
      return filterGroupPatientsByType(this.groups, 'COHORT');
    };

    PatientModel.prototype.getCurrentHospitalPatients = function() {
      return filterGroupPatientsByCurrent(this.getHospitalPatients());
    };

    PatientModel.prototype.getCurrentCohortPatients = function() {
      return filterGroupPatientsByCurrent(this.getCohortPatients());
    };

    PatientModel.prototype.getCohorts = function() {
      return uniqueGroups(this.getCohortPatients());
    };

    PatientModel.prototype.getHospitals = function() {
      return uniqueGroups(this.getHospitalPatients());
    };

    PatientModel.prototype.getGroups = function() {
      return uniqueGroups(this.groups);
    };

    PatientModel.prototype.getCurrentCohorts = function() {
      return uniqueGroups(this.getCurrentCohortPatients());
    };

    PatientModel.prototype.getCurrentHospitals = function() {
      return uniqueGroups(this.getCurrentHospitalPatients());
    };

    PatientModel.prototype.getFromDate = function(group) {
      var fromDate = null;

      // Find the earliest from date for this group
      for (var i = 0; i < this.groups.length; i++) {
        var currentGroup = this.groups[i];

        if (currentGroup.group.id === group.id && (fromDate === null || currentGroup.fromDate < fromDate)) {
          fromDate = currentGroup.fromDate;
        }
      }

      return fromDate;
    };

    return PatientModel;
  }]);

  app.config(['storeProvider', function(storeProvider) {
    storeProvider.registerModel('patients', 'PatientModel');
  }]);
})();
