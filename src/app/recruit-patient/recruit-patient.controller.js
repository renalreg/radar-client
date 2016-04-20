(function() {
  'use strict';

  var app = angular.module('radar.recruitPatient');

  function RecruitPatientController(
    $scope,
    adapter,
    $state,
    $q,
    store,
    _
  ) {
    $scope.loading = true;

    $scope.searchParams = {};
    $scope.searchErrors = {};

    $scope.patient = {};
    $scope.patientErrors = {};

    $scope.search = search;
    $scope.recruit = recruit;

    $scope.backToSearch = backToSearch;

    init();

    function init() {
      $q.all([loadGenders(), loadEthnicities(), loadNumberGroups()]).then(function() {
        $scope.loading = false;
      });
    }

    function search() {
      $scope.loading = true;

      return adapter.post('/recruit-patient-search', {}, $scope.searchParams)
        .then(function(response) {
          var patient = response.data.patient;

          $scope.patient = {
            id: patient.id,
            firstName: $scope.searchParams.firstName,
            lastName: $scope.searchParams.lastName,
            dateOfBirth: $scope.searchParams.dateOfBirth,
            gender: $scope.searchParams.gender,
            numberGroup: $scope.searchParams.numberGroup,
            number: $scope.searchParams.number,
          };

          $scope.searchErrors = {};

          $state.go('recruitPatient.form');
        })
        ['catch'](function(response) {
          if (response.status === 422) {
            $scope.searchErrors = response.data.errors || {};
          }
        })
        ['finally'](function() {
          $scope.loading = false;
        });
    }

    function recruit() {
      $scope.loading = true;

      return adapter.post('/recruit-patient', {}, $scope.patient)
        .then(function(response) {
          var patientId = response.data.id;
          $state.go('patient.demographics', {patientId: patientId});
        })
        ['catch'](function(response) {
          if (response.status === 422) {
            $scope.patientErrors = response.data.errors || {};
          }
        })
        ['finally'](function() {
          $scope.loading = false;
        });
    }

    function backToSearch() {
      $state.go('recruitPatient.search');
    }

    function loadGenders() {
      return store.findMany('genders').then(function(genders) {
        $scope.genders = genders;
      });
    }

    function loadEthnicities() {
      return store.findMany('ethnicities').then(function(ethnicities) {
        $scope.ethnicities = ethnicities;
      });
    }

    function loadNumberGroups() {
      return store.findMany('groups', {isRecruitmentNumberGroup: true}).then(function(groups) {
        // Sort by name
        groups = _.sortBy(groups, 'name');

        // Set the options
        $scope.numberGroups = groups;
      });
    }
  }

  RecruitPatientController.$inject = [
    '$scope',
    'adapter',
    '$state',
    '$q',
    'store',
    '_'
  ];

  app.controller('RecruitPatientController', RecruitPatientController);
})();
