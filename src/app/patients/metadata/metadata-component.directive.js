import templateUrl from './metadata-component.html';

function patientMetadataPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

patientMetadataPermissionFactory.$inject = ['PatientObjectPermission'];

function patientMetadataControllerFactory(
  ModelDetailController,
  PatientMetadataPermission,
  $injector,
  store,
) {
  /**
   * A component for recording metadata about the patient (for example comments).
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function PatientMetadataController($scope) {
    var self = this;

    $injector.invoke(ModelDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PatientMetadataPermission($scope.patient),
      },
    });

    var shortNames = [];
    for (let group of $scope.patient.groups) {
      shortNames.push(group.group.shortName);
    }
    $scope.groupShortNames = shortNames;
    // Load the patient and then load the patient demographics

    self.load($scope.patient)
      .then(function() {
        // Fetch patient demographics after patient data is loaded
        return store.findMany('patient-demographics', { patient: $scope.patient.id });
      })
      .then(function(patientDemographics) {
        // Assign the resolved patient demographics to $scope
        $scope.patientDemographics = patientDemographics[0];
        // Call the view function if needed
        self.view();
      })
      .catch(function(error) {
        // Handle any errors from either load or findMany
        console.error('Error loading patient data or demographics:', error);
      })
      .finally(function() {
        // Ensure patientDemographics is logged after it is resolved
        console.log($scope.patientDemographics);
        console.log(store)
        console.log($scope)
      });



  }

  PatientMetadataController.$inject = ['$scope'];
  PatientMetadataController.prototype = Object.create(
    ModelDetailController.prototype
  );

  return PatientMetadataController;
}

patientMetadataControllerFactory.$inject = [
  'ModelDetailController',
  'PatientMetadataPermission',
  '$injector',
  'store'
];

function patientMetadataComponent(PatientMetadataController) {
  return {
    scope: {
      patient: '=',
    },
    controller: PatientMetadataController,
    templateUrl: templateUrl,
  };
}

patientMetadataComponent.$inject = ['PatientMetadataController'];

export {
  patientMetadataPermissionFactory,
  patientMetadataControllerFactory,
  patientMetadataComponent,
};
