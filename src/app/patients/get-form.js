import { toStateString } from './utils.js';

function getForm(form, patient) {
  return {
    name: form.name,
    state: toStateString('patient.forms', {
      patientId: patient.id,
      formId: form.id
    })
  };
}

export default getForm;
