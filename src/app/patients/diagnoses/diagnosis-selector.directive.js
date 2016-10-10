import _ from 'lodash';

import templateUrl from './diagnosis-selector.html';

function diagnosisSelector(store) {
  return {
    require: 'ngModel',
    templateUrl: templateUrl,
    scope: {
      'patient': '='
    },
    link: function(scope, element, attrs, ngModel) {
      var groupDiagnoses = {};

      function getDiagnoses(group) {
        var key = group === null ? null : group.id;
        return groupDiagnoses[key] || [];
      }

      scope.group = null;
      scope.groups = [];
      scope.diagnosis = null;
      scope.diagnoses = [];
      scope.loading = true;

      ngModel.$render = function() {
        scope.diagnosis = ngModel.$viewValue;
      };

      scope.setGroup = function(group) {
        scope.group = group;
        scope.diagnoses = getDiagnoses(group);
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

          if (groupDiagnoses[key] === undefined) {
            groupDiagnoses[key] = [];
          }

          var weight = group === null ? diagnosis.name : [diagnosis.getWeight(group.id), diagnosis.name];

          groupDiagnoses[key].push({
            diagnosis: diagnosis,
            edtaCode: diagnosis.getEdtaCode(),
            weight: weight
          });
        }

        _.forEach(diagnoses, function(diagnosis) {
          // Add diagnosis to all
          add(null, diagnosis);

          _.forEach(diagnosis.groups, function(group) {
            if (group.type.id === 'SECONDARY') {
              // Add diagnosis to group
              add(group.group, diagnosis);
            }
          });
        });

        // Get's patients groups sorted by name
        scope.groups = _.sortBy(scope.patient.getGroups(), 'shortName');

        // Remove groups that don't have any diagnoses
        scope.groups = _.filter(scope.groups, function(group) {
          return getDiagnoses(group).length > 0;
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
}

diagnosisSelector.$inject = ['store'];

export default diagnosisSelector;
