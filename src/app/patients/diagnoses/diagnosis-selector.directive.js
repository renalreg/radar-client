(function() {
  'use strict';

  var app = angular.module('radar.patients.diagnoses');

  app.directive('diagnosisSelector', ['store', '_', function(store, _) {
    return {
      require: 'ngModel',
      templateUrl: 'app/patients/diagnoses/diagnosis-selector.html',
      scope: {
        'patient': '='
      },
      link: function(scope, element, attrs, ngModel) {
        scope.group = null;
        scope.groups = [];
        scope.diagnosis = null;
        scope.diagnoses = {};
        scope.loading = true;

        ngModel.$render = function() {
          scope.diagnosis = ngModel.$viewValue;
        };

        scope.getDiagnoses = function(group) {
          var key = group === null ? null : group.id;

          return scope.diagnoses[key] || [];
        };

        scope.setGroup = function(group) {
          scope.group = group;
        };

        scope.isActive = function(group) {
          return scope.group === group;
        };

        scope.use = function(diagnosis) {
          update(diagnosis);
        };

        scope.drop = function() {
          update(null);
        };

        function update(diagnosis) {
          scope.diagnosis = diagnosis;
          ngModel.$setViewValue(diagnosis);
        }

        // Load diagnoses
        store.findMany('diagnoses').then(function(diagnoses) {
          // Add a diagnosis
          function add(group, diagnosis) {
            var key = group === null ? null : group.id;

            if (scope.diagnoses[key] === undefined) {
              scope.diagnoses[key] = [];
            }

            scope.diagnoses[key].push(diagnosis);
          }

          _.forEach(diagnoses, function(diagnosis) {
            // Add diagnosis to all
            add(null, diagnosis);

            _.forEach(diagnosis.groups, function(group) {
              // Add diagnosis to group
              add(group.group, diagnosis);
            });
          });

          // Get's patients groups sorted by name
          scope.groups = _.sortBy(scope.patient.getGroups(), 'shortName');

          // Remove groups that don't have any diagnoses
          scope.groups = _.filter(scope.groups, function(group) {
            return scope.getDiagnoses(group).length > 0;
          });

          // Default to first group with diagnoses (otherwise all)
          if (scope.groups.length > 0) {
            scope.setGroup(scope.groups[0]);
          }

          // Finished loading
          scope.loading = false;
        });
      }
    };
  }]);
})();
