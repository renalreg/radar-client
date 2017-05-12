import templateUrl from './nurture-samples-component.html'

function nurtureSamplesPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

nurtureSamplesPermissionFactory.$inject = ['PatientObjectPermission'];

function nurtureSamplesControllerFactory(
  ModelListDetailController,
  NurtureSamplesPermission,
  firstPromise,
  $injector,
  store
) {
  function NurtureSamplesController($scope) {
    var self = this;


    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {permission: new NurtureSamplesPermission($scope.patient)}
    });

    self.load(firstPromise([
      store.findMany('samples', {patient: $scope.patient.id}),
      store.findMany('samples-protocol-options').then(function(protocolOptions) {
        $scope.protocolOptions = protocolOptions;
      })
    ]));



    $scope.create = function() {
      var item = store.create('samples', {patient: $scope.patient.id})
       console.log(item);
      self.edit(item);
    }

    $scope.showEpa = function() {
      if ($scope.item && $scope.item.protocol) {
        var protocol = $scope.item.protocol.id;
        switch(protocol) {
          case 'ADULT':
            $scope.item.epa = 18;
            break;
          case 'CHILDREN30+B':
            $scope.item.epa = 11;
            break;
          case 'CHILDREN30+2ND':
            $scope.item.epa = 10;
            break;
          case 'CHILDREN15+B':
            $scope.item.epa = 7;
            break;
          default:
            $scope.item.epa = null;
        }
      }
      return $scope.item.epa;
    }

    $scope.defaultEpaValue = function() {
      if ($scope.showEpa() && !$scope.item.epa) {
        $scope.item.epa = 18;
      }
    }
  }

  NurtureSamplesController.$inject = ['$scope'],
  NurtureSamplesController.prototype = Object.create(ModelListDetailController.prototype);

  return NurtureSamplesController;
}

nurtureSamplesControllerFactory.$inject = [
  'ModelListDetailController',
  'AlportClinicalPicturePermission',
  'firstPromise',
  '$injector',
  'store'
];

function nurtureSamplesComponent(NurtureSamplesController) {
  return {
    scope: {
      patient: '='
    },
    controller: NurtureSamplesController,
    templateUrl: templateUrl
  };
}

nurtureSamplesComponent.$inject = ['NurtureSamplesController'];

export {
  nurtureSamplesPermissionFactory,
  nurtureSamplesControllerFactory,
  nurtureSamplesComponent
};
