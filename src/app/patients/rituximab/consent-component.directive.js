import templateUrl from './consent-component.html';

function rituximabConsentPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

rituximabConsentPermissionFactory.$inject = ['PatientObjectPermission'];

function rituximabConsentControllerFactory(
  ModelDetailController,
  RituximabConsentPermission,
  $injector,
  store
) {
  function RituximabConsentController($scope) {
    var self = this;

    $injector.invoke(ModelDetailController, self, {
      $scope: $scope,
      params: {
        permission: new RituximabConsentPermission($scope.patient)
      }
    });

    $scope.multiple = false;

    self.load(store.findFirst('rituximab-consent', {patient: $scope.patient.id})).then(function() {
      self.view();
    });

    $scope.create = function() {
      var item = store.create('rituximab-consent', {patient: $scope.patient.id});
      self.edit(item);
    };

  }

  RituximabConsentController.$inject = ['$scope'];
  RituximabConsentController.prototype = Object.create(ModelDetailController.prototype);

  return RituximabConsentController;
}

rituximabConsentControllerFactory.$inject = [
  'ModelDetailController',
  'RituximabConsentPermission',
  '$injector',
  'store'
];

function rituximabConsentComponent(RituximabConsentController) {
  return {
    scope: {
      patient: '='
    },
    controller: RituximabConsentController,
    templateUrl: templateUrl
  };
}

rituximabConsentComponent.$inject = ['RituximabConsentController'];

export {
  rituximabConsentPermissionFactory,
  rituximabConsentControllerFactory,
  rituximabConsentComponent
};
