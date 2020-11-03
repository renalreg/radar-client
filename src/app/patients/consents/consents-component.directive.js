// import _ from 'lodash';
import templateUrl from './consents-component.html';

function patientConsentPermissionFactory(PatientConsentPermission) {
  return PatientConsentPermission;
}

patientConsentPermissionFactory.$inject = ['PatientConsentPermission'];

function patientConsentsControllerFactory(
  ModelListDetailController,
  PatientConsentPermission,
  firstPromise,
  $injector,
  store,
  $state
) {
  /**
   * This component is for recording the patient's consents.
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function PatientConsentsController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PatientConsentPermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('patient-consents', {patient: $scope.patient.id}).then(function(patientConsents) {
        $scope.consentedCodes = {};
        return patientConsents;
      }),
      store.findMany('consents', {patient: $scope.patient.id}).then(function(consents) {
        $scope.consents = consents;
        $scope.activeConsents = [];
        for (var i=0; i < consents.length; i++) {
          var consent = consents[i];
          if (!consent.retired && consent.consentType === 'FORM') {
            $scope.activeConsents.push(consent);
          }
        }
        $scope.activeConsents.sort((a, b) => (a.weight > b.weight) ? 1 : -1).reverse();
      })
    ])).then(function() {
      if (!$scope.patient.consented) {
        create();
      }
    });

    $scope.create = create;

    function create() {
      var item = store.create('patient-consents', {patient: $scope.patient.id});
      item.signedOnDate = new Date().toISOString();
      self.edit(item);
    }

    $scope.isChecked = function(code) {
      return $scope.consentedCodes[code] === true;
    };
  }

  PatientConsentsController.$inject = ['$scope'];
  PatientConsentsController.prototype = Object.create(ModelListDetailController.prototype);

  PatientConsentsController.prototype.save = function() {
    var self = this;
    return ModelListDetailController.prototype.save.call(self).then(function() {
      self.scope.patient.consented = true;
      self.scope.patient.reload();
      $state.go('patient.demographics', [self.scope.patient.id]);
    });
  };

  PatientConsentsController.prototype.remove = function(item) {
    var self = this;

    return ModelListDetailController.prototype.remove.call(self, item).then(function() {
      self.scope.patient.reload();
    });
  };



  return PatientConsentsController;
}

patientConsentsControllerFactory.$inject = [
  'ModelListDetailController',
  'PatientConsentPermission',
  'firstPromise',
  '$injector',
  'store',
  '$state'
];

function patientConsentsComponent(PatientConsentsController) {
  return {
    scope: {
      patient: '='
    },
    controller: PatientConsentsController,
    templateUrl: templateUrl
  };
}

patientConsentsComponent.$inject = ['PatientConsentsController'];

export {
  patientConsentPermissionFactory,
  patientConsentsControllerFactory,
  patientConsentsComponent
};
