(function() {
  'use strict';

  var app = angular.module('radar.patients.forms');

  app.factory('formStore', ['store', 'adapter', '_', function(store, adapter, _) {
    return {
      getForms: function(patientId) {
        // Get forms relevant to a patient
        return adapter.get('/form-counts', {patient: patientId}).then(function(response) {
          var forms = _.map(response.data.data, function(x) {
            return {
              form: store.pushToStore(store.create('forms', x.form)),
              count: x.count
            };
          });

          return forms;
        });
      },
      getForm: function(formId) {
        return store.findOne('forms', formId);
      },
      getEntries: function(patientId, formId) {
        return store.findMany('entries', {patient: patientId, form: formId});
      }
    };
  }]);
})();
