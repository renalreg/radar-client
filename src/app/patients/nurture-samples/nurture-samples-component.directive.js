import _ from 'lodash';
import templateUrl from './nurture-samples-component.html';

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

    var originalOptions = null;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {permission: new NurtureSamplesPermission($scope.patient)}
    });

    self.load(firstPromise([
      store.findMany('samples', {patient: $scope.patient.id}),
      store.findMany('samples-protocol-options').then(function(protocolOptions) {
        originalOptions = _.cloneDeep(protocolOptions);
        $scope.protocolOptions = protocolOptions;
      })
    ]));

    $scope.saveAndView = function() {
      $scope.item.epa = $scope.item.protocol.epa;
      $scope.item.epb = $scope.item.protocol.epb;
      $scope.item.lpa = $scope.item.protocol.lpa;
      $scope.item.lpb = $scope.item.protocol.lpb;
      $scope.item.uc = $scope.item.protocol.uc;
      $scope.item.ub = $scope.item.protocol.ub;
      $scope.item.ud = $scope.item.protocol.ud;
      $scope.item.fub = $scope.item.protocol.fub;
      $scope.item.sc = $scope.item.protocol.sc;
      $scope.item.sa = $scope.item.protocol.sa;
      $scope.item.sb = $scope.item.protocol.sb;
      $scope.item.rna = $scope.item.protocol.rna;
      $scope.item.wb = $scope.item.protocol.wb;

      return self.save().then(function(item) {
        self.view(item);
      });
    };

    $scope.edit = function(item) {
      $scope.protocolOptions = _.cloneDeep(originalOptions);

      var ok = $scope.item === null || !$scope.editing || !$scope.item.isDirty() ||
      self.discardChanges();

      if (!ok) {
        return;
      }

      $scope.viewing = false;
      $scope.editing = true;
      $scope.originalItem = item;
      $scope.item = item.clone();

      if ($scope.item.protocol) {
        $scope.item.protocol.epa = $scope.item.epa;
        $scope.item.protocol.epb = $scope.item.epb;
        $scope.item.protocol.lpa = $scope.item.lpa;
        $scope.item.protocol.lpb = $scope.item.lpb;
        $scope.item.protocol.uc = $scope.item.uc;
        $scope.item.protocol.ub = $scope.item.ub;
        $scope.item.protocol.ud = $scope.item.ud;
        $scope.item.protocol.fub = $scope.item.fub;
        $scope.item.protocol.sc = $scope.item.sc;
        $scope.item.protocol.sa = $scope.item.sa;
        $scope.item.protocol.sb = $scope.item.sb;
        $scope.item.protocol.rna = $scope.item.rna;
        $scope.item.protocol.wb = $scope.item.wb;
      }
    };

    $scope.create = function() {
      var item = store.create('samples', {patient: $scope.patient.id});
      $scope.edit(item);
    };

    function getProtocol() {
      return $scope.item.protocol.id;
    }

    $scope.showEp = function() {
      if ($scope.item && $scope.item.protocol) {
        var protocol = getProtocol();
        return (
          protocol === 'ADULT_NS' ||
          protocol === 'ADULT_CKD' ||
          protocol === 'CHILDREN30_B' ||
          protocol === 'CHILDREN30_2ND' ||
          protocol === 'CHILDREN15_B'
        );
      }
      return false;
    };

    $scope.showLp = function() {
      if ($scope.item && $scope.item.protocol) {
        var protocol = getProtocol();
        return (
          protocol === 'ADULT_NS' ||
          protocol === 'ADULT_CKD' ||
          protocol === 'CHILDREN30_B' ||
          protocol === 'CHILDREN30_2ND'
        );
      }
      return false;
    };

    $scope.showU = function() {
      if ($scope.item && $scope.item.protocol) {
        var protocol = getProtocol();
        return (
          protocol === 'ADULT_NS' ||
          protocol === 'ADULT_CKD' ||
          protocol === 'CHILDREN30_B' ||
          protocol === 'CHILDREN15_B' ||
          protocol === 'CHILDREN_LESS_15_B'
        );
      }
      return false;
    };

    $scope.showFub = function() {
      return $scope.showU();
    };

    $scope.showSc = function() {
      return $scope.showU();
    };

    $scope.showSa = function() {
      if ($scope.item && $scope.item.protocol) {
        return getProtocol() !== 'CHILDREN_LESS_15_2ND';
      }
      return false;
    };

    $scope.showSb = function() {
      if ($scope.item && $scope.item.protocol) {
        var protocol = getProtocol()
        return (
          protocol === 'ADULT_NS' ||
          protocol === 'ADULT_CKD'
        );
      }
      return false;
    };

    $scope.showRna = function() {
      if ($scope.item && $scope.item.protocol) {
        var protocol = getProtocol();
        return (
          protocol === 'ADULT_NS' ||
          protocol === 'ADULT_CKD' ||
          protocol === 'CHILDREN30_2ND'
        );
      }
      return false;
    };

    $scope.showWb = function() {
      if ($scope.item && $scope.item.protocol) {
        var protocol = getProtocol();
        return (
          protocol === 'ADULT_NS' ||
          protocol === 'ADULT_CKD' ||
          protocol === 'CHILDREN30_2ND' ||
          protocol === 'CHILDREN15_2ND' ||
          protocol === 'CHILDREN_LESS_15_2ND'
        );
      }
      return false;
    };
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
