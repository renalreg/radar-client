import _ from 'lodash';

import templateUrl from './hospitals-component.html';

function patientHospitalPermissionFactory(hasPermission, hasPermissionForGroup, session) {
  function PatientHospitalPermission() {
  }

  PatientHospitalPermission.prototype.hasPermission = function() {
    // User must have the EDIT_PATIENT_MEMBERSHIP on any group
    return hasPermission(session.user, 'EDIT_PATIENT_MEMBERSHIP');
  };

  PatientHospitalPermission.prototype.hasObjectPermission = function(obj) {
    // User must have the EDIT_PATIENT_MEMBERSHIP permission on the group and created group
    return (
        hasPermissionForGroup(session.user, obj.group, 'EDIT_PATIENT_MEMBERSHIP') &&
        hasPermissionForGroup(session.user, obj.createdGroup, 'EDIT_PATIENT_MEMBERSHIP')
    );
  };

  return PatientHospitalPermission;
}

patientHospitalPermissionFactory.$inject = ['hasPermission', 'hasPermissionForGroup', 'session'];

function patientHospitalsControllerFactory(
  ModelListDetailController,
  PatientHospitalPermission,
  $injector,
  store
) {
  /**
   * A patient may attend several hospitals over their life. A patient may go to another hospital
   * for specialist treatment or more permanently if they move house. The from and to date of each
   * membership represented the period where a patient was being treated at that hospital.
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function PatientHospitalsController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PatientHospitalPermission()
      }
    });

    self.load($scope.patient.getHospitalPatients());

    $scope.create = function() {
      self.edit(store.create('group-patients', {patient: $scope.patient.id}));
    };
  }

  PatientHospitalsController.$inject = ['$scope'];
  PatientHospitalsController.prototype = Object.create(ModelListDetailController.prototype);

  /**
   * Called when a membership is updated.
   *
   * @returns {Object} - a promise that resolves to the saved membership.
   */
  PatientHospitalsController.prototype.save = function() {
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
   * @param {Object} groupPatient - membership to delete.
   * @returns {Object} - a promise.
   */
  PatientHospitalsController.prototype.remove = function(groupPatient) {
    var self = this;

    return ModelListDetailController.prototype.remove.call(self, groupPatient).then(function() {
      // Remove this membership from the patient's membership list
      _.pull(self.scope.patient.groups, groupPatient);
    });
  };

  return PatientHospitalsController;
}

patientHospitalsControllerFactory.$inject = [
  'ModelListDetailController',
  'PatientHospitalPermission',
  '$injector',
  'store'
];

function patientHospitalsComponent(PatientHospitalsController) {
  return {
    scope: {
      patient: '='
    },
    controller: PatientHospitalsController,
    templateUrl: templateUrl
  };
}

patientHospitalsComponent.$inject = ['PatientHospitalsController'];

export {
  patientHospitalPermissionFactory,
  patientHospitalsControllerFactory,
  patientHospitalsComponent
};
