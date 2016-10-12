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
  /**
   * A patient can be a member of multiple cohorts. Each membership has a from and
   * to date which is the period where the membership is active. A null to date means
   * the membership won't expire. A patient can have multiple memberships for the same
   * group.
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
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

  /**
   * Called when a membership is saved.
   *
   * @returns {Object} - a promise.
   */
  PatientCohortsController.prototype.save = function() {
    var self = this;

    return ModelListDetailController.prototype.save.call(self).then(function(groupPatient) {
      // If this is a new membership add it to the patient's membership list
      if (!_.includes(self.scope.patient.groups, groupPatient)) {
        self.scope.patient.groups.push(groupPatient);
      }

      return groupPatient;
    });
  };

  /**
   * Called when a membership is deleted.
   *
   * @param {Object} groupPatient - membership to remove.
   * @returns {Object} - a promise.
   * */
  PatientCohortsController.prototype.remove = function(groupPatient) {
    var self = this;

    return ModelListDetailController.prototype.remove.call(self, groupPatient).then(function() {
      // Remove this membership from the patient's membership list
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
