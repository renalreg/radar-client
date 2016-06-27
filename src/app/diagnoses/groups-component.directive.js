(function() {
  'use strict';

  var app = angular.module('radar.consultants');

  function controllerFactory(
    ListEditController,
    $injector,
    firstPromise,
    store
  ) {
    function DiagnosisGroupsController($scope) {
      $injector.invoke(ListEditController, this, {$scope: $scope, params: {}});
      this.load(firstPromise([
        $scope.parent.groups,
        store.findMany('group-diagnosis-types').then(function(types) {
          $scope.types = types;
        })
      ]));

      $scope.create = function() {
        $scope.parent.groups.push({});
      };
    }

    DiagnosisGroupsController.$inject = ['$scope'];
    DiagnosisGroupsController.prototype = Object.create(ListEditController.prototype);

    return DiagnosisGroupsController;
  }

  controllerFactory.$inject = [
    'ListEditController',
    '$injector',
    'firstPromise',
    'store'
  ];

  app.factory('DiagnosisGroupsController', controllerFactory);

  app.directive('diagnosisGroupsComponent', ['DiagnosisGroupsController', function(DiagnosisGroupsController) {
    return {
      scope: {
        parent: '=diagnosis'
      },
      controller: DiagnosisGroupsController,
      templateUrl: 'app/diagnoses/groups-component.html'
    };
  }]);
})();
