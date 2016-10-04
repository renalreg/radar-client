import { toStateString } from './utils.js';

function getForm(form, patient) {
  return {
    name: form.name,
    state: toStateString('patient.form', {
      patientId: patient.id,
      formSlug: form.slug
    })
  };
}

export default getForm;
