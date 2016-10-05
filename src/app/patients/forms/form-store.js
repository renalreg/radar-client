import _ from 'lodash';

function formStore(store, adapter) {
  function _getForms(params) {
    if (params === undefined) {
      params = {};
    }

    return adapter.get('/form-counts', params).then(function(response) {
      var forms = _.map(response.data.data, function(x) {
        return {
          form: store.pushToStore(store.create('forms', x.form)),
          count: x.count
        };
      });

      return forms;
    });
  }

  /** Get forms for a group/patient. */
  function getForms(groupId, patientId) {
    return _getForms({group: groupId, patient: patientId, type: 'form'});
  }

  /** Get questionnaires for a group/patient. */
  function getQuestionnaires(groupId, patientId) {
    return _getForms({group: groupId, patient: patientId, type: 'questionnaire'});
  }

  /** Get a single form. */
  function getForm(formSlug) {
    return store.findFirst('forms', {slug: formSlug});
  }

  /** Get entries for this patient and form. */
  function getEntries(patientId, formId) {
    return store.findMany('entries', {patient: patientId, form: formId});
  }

  /** Get entry for this patient and form. */
  function getEntry(patientId, formId) {
    return store.findFirst('entries', {patient: patientId, form: formId});
  }

  /** Create a new form entry. */
  function create(patientId, formId) {
    return store.create('entries', {patient: patientId, form: formId});
  }

  return {
    getForms: getForms,
    getQuestionnaires: getQuestionnaires,
    getForm: getForm,
    getEntries: getEntries,
    getEntry: getEntry,
    create: create
  };
}

formStore.$inject = ['store', 'adapter'];

export default formStore;
