import _ from 'lodash';

function RecruitPatientController($scope, adapter, $state, $q, store) {
  $scope.loading = true;

  $scope.searchParams = {};
  $scope.searchErrors = {};

  $scope.patient = {};
  $scope.patientErrors = {};

  $scope.search = search;
  $scope.recruit = recruit;

  $scope.goToDiagnosis = goToDiagnosis;
  $scope.backToSearch = backToSearch;
  $scope.backToDemographics = backToDemographics;

  $scope.someSelected = someSelected;

  init();

  function init() {
    $q.all([
      loadGenders(),
      loadEthnicities(),
      loadNumberGroups(),
      loadNationalities(),
      loadConsents(),
      loadBiopsyDiagnoses(),
    ]).then(function () {
      $scope.loading = false;
    });
  }

  function someSelected(object) {
    if (!object) {
      return false;
    }

    return Object.keys(object).some(function (key) {
      return object[key];
    });
  }

  function isPaediatric(dateOfBirth) {
    var today = new Date();
    var birthDate = new Date(dateOfBirth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age < 16;
  }

  function search() {
    $scope.loading = true;

    return adapter
      .post('/recruit-patient-search', {}, $scope.searchParams)
      .then(function (response) {
        var patient = response.data.patient;

        var patientId = patient ? patient.id : null;

        $scope.patient = {
          id: patientId,
          firstName: $scope.searchParams.firstName,
          lastName: $scope.searchParams.lastName,
          dateOfBirth: $scope.searchParams.dateOfBirth,
          emailAddress: $scope.searchParams.emailAddress,
          gender: $scope.searchParams.gender,
          numberGroup: $scope.searchParams.numberGroup,
          number: $scope.searchParams.number,
          paediatric: isPaediatric($scope.searchParams.dateOfBirth),
          diagnosis: {},
        };

        $scope.searchErrors = {};

        $state.go('recruitPatient.form');
      })
      .catch(function (response) {
        if (response.status === 422) {
          $scope.searchErrors = response.data.errors || {};
        }
      })
      .finally(function () {
        $scope.loading = false;
      });
  }

  function goToDiagnosis() {
    $scope.loading = true;
    return adapter
      .get('/environment')
      .then(function () {
        var cohortCode = $scope.patient.cohortGroup.code;
        $scope.biopsyDiagnosisRequired =
          cohortCode === 'INS' || cohortCode === 'INS-NEPHROS';
        $state.go('recruitPatient.diagnosis');
      store.findMany('antibodies', { group_id: $scope.patient.cohortGroup.id }).then(function(antibodies) {
        $scope.antibodies = antibodies.map(function (a) {
      return a.id;
    });
      });
      })
      .catch(function (response) {
        if (response.status === 422) {
          $scope.patientErrors = response.data.errors || {};
        }
      })
      .finally(function () {
        $scope.loading = false;
      });
  }

  function recruit() {
    $scope.loading = true;

    return adapter
      .post('/recruit-patient', {}, $scope.patient)
      .then(function (response) {
        var patientId = response.data.id;
        $state.go('patient.demographics', { patientId: patientId });
      })
      .catch(function (response) {
        if (response.status === 422) {
          $scope.patientErrors = response.data.errors || {};
        }
      })
      .finally(function () {
        $scope.loading = false;
      });
  }

  function backToSearch() {
    $state.go('recruitPatient.search');
  }

  function backToDemographics() {
    $state.go('recruitPatient.form');
  }

  function loadGenders() {
    return store.findMany('genders').then(function (genders) {
      $scope.genders = genders;
    });
  }

  function loadEthnicities() {
    return store
      .findMany('ethnicities', { user: $scope.user.id })
      .then(function (ethnicities) {
        $scope.ethnicities = ethnicities;
      });
  }

  function loadNumberGroups() {
    return store
      .findMany('groups', { isRecruitmentNumberGroup: true })
      .then(function (groups) {
        // Sort by name
        groups = _.sortBy(groups, 'name');

        // Set the options
        $scope.numberGroups = groups;
      });
  }

  function loadNationalities() {
    return store
      .findMany('nationalities', { user: $scope.user.id })
      .then(function (nationalities) {
        nationalities = _.sortBy(nationalities, 'name');
        $scope.nationalities = nationalities;
      });
  }

  function loadConsents() {
    return store.findMany('consents').then(function (consents) {
      $scope.consents = _.sortBy(consents, ['weight', 'label']);
    });
  }

  function loadBiopsyDiagnoses() {
    return store.findMany('biopsy-diagnoses').then(function (biopsyDiagnoses) {
      $scope.biopsyDiagnoses = biopsyDiagnoses;
    });
  }
}

RecruitPatientController.$inject = [
  '$scope',
  'adapter',
  '$state',
  '$q',
  'store',
];

export default RecruitPatientController;
