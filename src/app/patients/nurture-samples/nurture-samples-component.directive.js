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
      store.findMany('samples', {patient: $scope.patient.id}).then(function(samples) {
        return samples;
        // self.items = samples;
      }),
      store.findMany('samples-protocol-options').then(function(protocolOptions) {
        $scope.protocolOptions = protocolOptions;
      })
    ]));

    // $scope.protocolOptions = [{
      // 'id': 'ADULT',
      // 'label': 'Adult',
      // 'epa': 18
    // },
       // {'id': 'CHILDREN30+B', 'label': 'Children 30+ First', 'epa': 11}
    // ]

    // $scope.saveAndView = function() {
    //   console.log($scope.item.protocol.epa);

    //   var self = this;
    //   console.log(self);
    //   console.log(self.item);
    //   self.item.epa = $scope.item.protocol.epa.value;
    //   self.scope.item.epa = $scope.item.protocol.value;
    //   self.scope.item.protocol = $scope.item.protocol.label;
    //   console.log(self.scope.item);

    //   return self.save().then(function(item) {
    //     self.view(item);
    //   });

    // }


    $scope.create = function() {
      var item = store.create('samples', {patient: $scope.patient.id})
      $scope.edit(item);
    }

    // function setOptionValue(label, value) {
    //   for (var i = 0; i < $scope.protocolOptions.length; i++) {
    //     if ($scope.protocolOptions[i].label === label) {
    //       console.log($scope.protocolOptions[i].value);
    //       $scope.protocolOptions[i].value = value;
    //       console.log($scope.protocolOptions[i].value);
    //       break;
    //     }
    //   }
    // }

    // $scope.edit = function(item) {
    //   if (item.epa) {
    //     setOptionValue('epa', item.epa);
    //   }
    //   console.log(item.protocol);
    //   self.edit(item);
    // }


    // http://plnkr.co/edit/Z2IIVdIaj48oIcZ6bbDj?p=preview

    $scope.showEpa = function() {
      if ($scope.item && $scope.item.protocol) {

        var protocol = $scope.item.protocol.id;
        switch(protocol) {
          case 'ADULT':
            // $scope.item.epa = 18;
            return true;

          case 'CHILDREN30+B':
            // $scope.item.epa = 11;
            return true;

          case 'CHILDREN30+2ND':
            // $scope.item.epa = 10;
            return true;
          case 'CHILDREN15+B':
            // $scope.item.epa = 7;
            return true;
          default:
            // $scope.item.epa = null;
        }
      }
      return false;
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
