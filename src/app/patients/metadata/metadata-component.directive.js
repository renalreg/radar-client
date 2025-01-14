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
  session
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

    // Expose user to scope
    $scope.user = session.user;

    self.load($scope.patient)
      .then(function() {
        // Only load patient demographics if the user is an admin
        if (session.user.isAdmin) {
          return store.findMany('patient-demographics', { patient: $scope.patient.id,sourceType: 'RADAR' })
            .then(function(patientDemographics) {
              // Assign the resolved patient demographics to $scope
              $scope.patientDemographics = patientDemographics[0];
            });
        }
      })
      .then(function() {
        // Call the view function if needed
        self.view();
      })
      .catch(function(error) {
        // Handle any errors from either load or findMany
        console.error('Error loading patient data or demographics:', error);
      })

    // Modify the save function to only save patientDemographics if the user is an admin
    self.save = function() {
      self.scope.saving = true;
      console.log('saving model', self.user);

      var savePromises = [
        this.scope.item.save(), // Save the patient model
      ];

      if (session.user.isAdmin) {
        // If the user is an admin, also save the patient demographics
        savePromises.push(this.scope.patientDemographics.save());
      }

      return Promise.all(savePromises)
        .then(function() {
          // After saving, switch to view mode
          self.view(self.scope.item);
        })
        .finally(function() {
          self.scope.saving = false;
        });
    };
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
  'store',
  'session'
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
