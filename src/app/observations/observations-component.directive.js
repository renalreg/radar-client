import templateUrl from './observations-component.html';

function observationsControllerFactory(
  ModelListDetailController,
  $injector,
  store
) {
  function ObservationsController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {}
    });

    self.load(store.findMany('observations'));
  }

  ObservationsController.$inject = ['$scope'];
  ObservationsController.prototype = Object.create(ModelListDetailController.prototype);

  return ObservationsController;
}

observationsControllerFactory.$inject = [
  'ModelListDetailController',
  '$injector',
  'store'
];

function observationsComponent(ObservationsController) {
  return {
    controller: ObservationsController,
    templateUrl: templateUrl
  };
}

observationsComponent.$inject = ['ObservationsController'];

export {
  observationsControllerFactory,
  observationsComponent
};
