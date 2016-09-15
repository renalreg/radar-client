import templateUrl from './hospitals-component.html';

function consultantHospitalsControllerFactory(
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

consultantHospitalsControllerFactory.$inject = [
  'ListEditController',
  '$injector'
];

function consultantHospitalsComponent(ConsultantHospitalsController) {
  return {
    scope: {
      parent: '=consultant'
    },
    controller: ConsultantHospitalsController,
    templateUrl: templateUrl
  };
}

consultantHospitalsComponent.$inject = ['ConsultantHospitalsController'];

export {
  consultantHospitalsControllerFactory,
  consultantHospitalsComponent
};
