import _ from 'lodash';

function formStore(store, adapter) {
  function _getForms(params) {
    if (params === undefined) {
      params = {};
    }

    return adapter.get('/form-counts', params).then(function(response) {
      var forms = _.map(response.data.data, function(x) {
        // Add the returned form to the store
        var form = store.pushToStore(store.create('forms', x.form));

        return {
          form: form,
          count: x.count
        };
      });

      return forms;
    });
  }

  /**
   * Get forms for a group/patient.
   *
   * @param {number} groupId - id of the group.
   * @param {number} patientId - id of the patient.
   * @returns {Object} - promise that resolves to a list of forms.
   */
  function getForms(groupId, patientId) {
    return _getForms({group: groupId, patient: patientId, type: 'form'});
  }

  /**
   * Get questionnaires for a group/patient.
   *
   * @param {number} groupId - id of the group.
   * @param {number} patientId - id of the patient.
   * @returns {Object} - promise that resolves to a list of forms.
   */
  function getQuestionnaires(groupId, patientId) {
    return _getForms({group: groupId, patient: patientId, type: 'questionnaire'});
  }

  /**
   * Get a single form using the slug (URL).
   *
   * @param {string} formSlug - slug of the form to fetch.
   * @returns {Object} - promise that resolves to a form.
   */
  function getForm(formSlug) {
    return store.findFirst('forms', {slug: formSlug});
  }

  /**
   * Get entries for this patient and form.
   *
   * @param {number} patientId - id of the patient.
   * @param {number} formId - id of the form.
   * @returns {Object} - promise that resolves to a list of entries.
   */
  function getEntries(patientId, formId) {
    return store.findMany('entries', {patient: patientId, form: formId});
  }

  /**
   * Get entry for this patient and form.
   *
   * @param {number} patientId - id of the patient.
   * @param {number} formId - id of the form.
   * @returns {Object} - promise that resolves to a entry.
   */
  function getEntry(patientId, formId) {
    return store.findFirst('entries', {patient: patientId, form: formId});
  }

  /**
   * Create a new form entry.
   *
   * @param {number} patientId - id of the patient.
   * @param {number} formId - if of the form.
   * @returns {Object} - a new entry.
   */
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
