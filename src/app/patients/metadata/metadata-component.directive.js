import templateUrl from "./metadata-component.html";

function patientMetadataPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

patientMetadataPermissionFactory.$inject = ["PatientObjectPermission"];

function patientMetadataControllerFactory(
  ModelDetailController,
  PatientMetadataPermission,
  $injector,
  store
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

    var signedOffStatesPromise = store
      .findMany("signedOffStates")
      .then(function (signedOffStates) {
        $scope.signedOffStates = signedOffStates;
        $scope.INSSignedOffStates = signedOffStates.filter(function (value) {
          return value.label != "Baseline complete, no FUP as Tx or dialysis";
        });
      });

    self.load($scope.patient).then(function () {
      self.view();
    }),
      signedOffStatesPromise;
  }

  PatientMetadataController.$inject = ["$scope"];
  PatientMetadataController.prototype = Object.create(
    ModelDetailController.prototype
  );

  return PatientMetadataController;
}

patientMetadataControllerFactory.$inject = [
  "ModelDetailController",
  "PatientMetadataPermission",
  "$injector",
  "store",
];

function patientMetadataComponent(PatientMetadataController) {
  return {
    scope: {
      patient: "=",
    },
    controller: PatientMetadataController,
    templateUrl: templateUrl,
  };
}

patientMetadataComponent.$inject = ["PatientMetadataController"];

export {
  patientMetadataPermissionFactory,
  patientMetadataControllerFactory,
  patientMetadataComponent,
};
