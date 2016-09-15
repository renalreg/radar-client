import _ from 'lodash';

import templateUrl from './cohorts-component.html';

function patientCohortPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

patientCohortPermissionFactory.$inject = ['PatientObjectPermission'];

function patientCohortsControllerFactory(
  ModelListDetailController,
  PatientCohortPermission,
  $injector,
  store
) {
  function PatientCohortsController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PatientCohortPermission($scope.patient)
      }
    });

    self.load($scope.patient.getCohortPatients());

    $scope.create = function() {
      self.edit(store.create('group-patients', {patient: $scope.patient.id}));
    };
  }

  PatientCohortsController.$inject = ['$scope'];
  PatientCohortsController.prototype = Object.create(ModelListDetailController.prototype);

  PatientCohortsController.prototype.save = function() {
    var self = this;

    return ModelListDetailController.prototype.save.call(self).then(function(groupPatient) {
      // Add the group to the patient's groups
      if (!_.includes(self.scope.patient.groups, groupPatient)) {
        self.scope.patient.groups.push(groupPatient);
      }

      return groupPatient;
    });
  };

  PatientCohortsController.prototype.remove = function(groupPatient) {
    var self = this;

    return ModelListDetailController.prototype.remove.call(self, groupPatient).then(function() {
      // Remove the group from the patient's groups
      _.pull(self.scope.patient.groups, groupPatient);
    });
  };

  return PatientCohortsController;
}

patientCohortsControllerFactory.$inject = [
  'ModelListDetailController',
  'PatientCohortPermission',
  '$injector',
  'store'
];

function patientCohortsComponent(PatientCohortsController) {
  return {
    scope: {
      patient: '='
    },
    controller: PatientCohortsController,
    templateUrl: templateUrl
  };
}

patientCohortsComponent.$inject = ['PatientCohortsController'];

export {
  patientCohortPermissionFactory,
  patientCohortsControllerFactory,
  patientCohortsComponent
};
