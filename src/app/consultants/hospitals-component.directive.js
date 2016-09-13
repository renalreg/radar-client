function consultantHospitalControllerFactory(
  ListEditController,
  $injector
) {
  function ConsultantHospitalsController($scope) {
    $injector.invoke(ListEditController, this, {$scope: $scope, params: {}});
    this.load($scope.parent.groups);

    $scope.create = function() {
      $scope.parent.groups.push({});
    };
  }

  ConsultantHospitalsController.$inject = ['$scope'];
  ConsultantHospitalsController.prototype = Object.create(ListEditController.prototype);

  return ConsultantHospitalsController;
}

consultantHospitalControllerFactory.$inject = [
  'ListEditController',
  '$injector'
];

function consultantHospitalsComponent(ConsultantHospitalsController) {
  return {
    scope: {
      parent: '=consultant'
    },
    controller: ConsultantHospitalsController,
    templateUrl: 'app/consultants/hospitals-component.html'
  };
}

consultantHospitalsComponent.$inject = ['ConsultantHospitalsController'];

export {
  consultantHospitalControllerFactory,
  consultantHospitalsComponent
};
