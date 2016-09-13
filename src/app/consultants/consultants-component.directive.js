import _ from 'lodash';

import templateUrl from './consultants-component.html';

function consultantPermissionFactory(AdminPermission) {
  return AdminPermission;
}

consultantPermissionFactory.$inject = ['AdminPermission'];

function consultantsControllerFactory(
  ModelListDetailController,
  ConsultantPermission,
  firstPromise,
  $injector,
  store
) {
  function ConsultantsController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new ConsultantPermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('consultants'),
      store.findMany('specialties').then(function(specialties) {
        $scope.specialties = _.sortBy(specialties, function(x) {
          return x.name;
        });
      })
    ]));

    $scope.create = function() {
      var item = store.create('consultants');
      self.edit(item);
    };
  }

  ConsultantsController.$inject = ['$scope'];
  ConsultantsController.prototype = Object.create(ModelListDetailController.prototype);

  return ConsultantsController;
}

consultantsControllerFactory.$inject = [
  'ModelListDetailController',
  'ConsultantPermission',
  'firstPromise',
  '$injector',
  'store'
];

function consultantsComponent(ConsultantsController) {
  return {
    controller: ConsultantsController,
    templateUrl: templateUrl
  };
}

consultantsComponent.$inject = ['ConsultantsController'];

export {
  consultantPermissionFactory,
  consultantsControllerFactory,
  consultantsComponent
};
