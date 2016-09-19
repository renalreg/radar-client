import templateUrl from './clinical-features-component.html';

function saltWastingClinicalFeaturesPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

saltWastingClinicalFeaturesPermissionFactory.$inject = ['PatientObjectPermission'];

function saltWastingClinicalFeaturesControllerFactory(
  ModelDetailController,
  SaltWastingClinicalFeaturesPermission,
  $injector,
  store
) {
  function SaltWastingClinicalFeaturesController($scope) {
    var self = this;

    $injector.invoke(ModelDetailController, self, {
      $scope: $scope,
      params: {
        permission: new SaltWastingClinicalFeaturesPermission($scope.patient)
      }
    });

    self.load(store.findFirst('salt-wasting-clinical-features', {patient: $scope.patient.id})).then(function() {
      self.view();
    });

    $scope.create = function() {
      var item = store.create('salt-wasting-clinical-features', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  SaltWastingClinicalFeaturesController.$inject = ['$scope'];
  SaltWastingClinicalFeaturesController.prototype = Object.create(ModelDetailController.prototype);

  return SaltWastingClinicalFeaturesController;
}

saltWastingClinicalFeaturesControllerFactory.$inject = [
  'ModelDetailController',
  'SaltWastingClinicalFeaturesPermission',
  '$injector',
  'store'
];

function saltWastingClinicalFeaturesComponent(SaltWastingClinicalFeaturesController) {
  return {
    scope: {
      patient: '='
    },
    controller: SaltWastingClinicalFeaturesController,
    templateUrl: templateUrl
  };
}

saltWastingClinicalFeaturesComponent.$inject = ['SaltWastingClinicalFeaturesController'];

export {
  saltWastingClinicalFeaturesPermissionFactory,
  saltWastingClinicalFeaturesControllerFactory,
  saltWastingClinicalFeaturesComponent
};
