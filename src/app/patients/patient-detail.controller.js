(function() {
  'use strict';

  var app = angular.module('radar.patients');

  function PatientDetailController(
    $scope,
    patient,
    session,
    hasPermissionForPatient,
    toggleDemographicsService,
    titleService
  ) {
    $scope.patient = patient;
    $scope.viewDemographicsPermission = hasPermissionForPatient(session.user, patient, 'VIEW_DEMOGRAPHICS');

    $scope.$watch(function() {
      return patient.getName(toggleDemographicsService.isVisible());
    }, titleService.setTitle);
  }

  PatientDetailController.$inject = [
    '$scope',
    'patient',
    'session',
    'hasPermissionForPatient',
    'toggleDemographicsService',
    'titleService'
  ];

  app.controller('PatientDetailController', PatientDetailController);
})();
