(function() {
  'use strict';

  var app = angular.module('radar.patients.mpgn');

  app.factory('MpgnClinicalPicturePermission', ['PatientObjectPermission', function(PatientObjectPermission) {
    return PatientObjectPermission;
  }]);

  function controllerFactory(
    ModelListDetailController,
    MpgnClinicalPicturePermission,
    $injector,
    store,
    firstPromise
  ) {
    function FuanClinicalPicturesController($scope) {
      var self = this;

      $injector.invoke(ModelListDetailController, self, {
        $scope: $scope,
        params: {
          permission: new MpgnClinicalPicturePermission($scope.patient)
        }
      });

      self.load(firstPromise([
        store.findMany('fuan-clinical-pictures', {patient: $scope.patient.id}),
        store.findMany('fuan-relatives').then(function(relatives) {
          $scope.relatives = relatives;
        }),
        store.findMany('fuan-thp-results').then(function(thpResults) {
          $scope.thpResults = thpResults;
        })
      ]));

      $scope.create = function() {
        var item = store.create('fuan-clinical-pictures', {patient: $scope.patient.id});
        self.edit(item);
      };
    }

    FuanClinicalPicturesController.$inject = ['$scope'];
    FuanClinicalPicturesController.prototype = Object.create(ModelListDetailController.prototype);

    return FuanClinicalPicturesController;
  }

  controllerFactory.$inject = [
    'ModelListDetailController',
    'MpgnClinicalPicturePermission',
    '$injector',
    'store',
    'firstPromise'
  ];

  app.factory('FuanClinicalPicturesController', controllerFactory);

  app.directive('fuanClinicalPicturesComponent', ['FuanClinicalPicturesController', function(FuanClinicalPicturesController) {
    return {
      scope: {
        patient: '='
      },
      controller: FuanClinicalPicturesController,
      templateUrl: 'app/patients/fuan/clinical-pictures-component.html'
    };
  }]);
})();
