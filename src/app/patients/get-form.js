import { toStateString } from './utils.js';

/** Get a link for a form. */
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
