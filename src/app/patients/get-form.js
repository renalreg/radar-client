import { toStateString } from './utils.js';

/**
 * Get a link for a form.
 *
 * @param {Object} form - a form.
 * @param {Object} patient - a patient.
 * @returns {Object} - a link.
 */
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
