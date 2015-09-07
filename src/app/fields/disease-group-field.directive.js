(function() {
  'use strict';

  var app = angular.module('radar.diseaseGroups');

  app.directive('frmDiseaseGroupField', function(_, session, store) {
    function sortDiseaseGroups(diseaseGroups) {
      return _.sortBy(diseaseGroups, function(x) {
        return x.name.toUpperCase();
      });
    }

    return {
      require: '^frmField',
      restrict: 'A',
      scope: {
        model: '=',
        required: '='
      },
      templateUrl: 'app/fields/disease-group-field.html',
      link: function(scope, element, attrs, fieldCtrl) {
        scope.$watch('required', function(value) {
          fieldCtrl.setRequired(value);
        });

        var user = session.user;

        if (user.isAdmin) {
          store.findMany('disease-groups').then(function(diseaseGroups) {
            scope.diseaseGroups = sortDiseaseGroups(diseaseGroups);
          });
        } else {
          var diseaseGroups = session.user.diseaseGroups;
          scope.diseaseGroups = sortDiseaseGroups(diseaseGroups);
        }
      }
    };
  });
})();

