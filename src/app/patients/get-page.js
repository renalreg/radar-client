import { toStateString } from './utils.js';

var PAGES = {
  ADDRESSES: {name: 'Addresses', state: 'patient.addresses'},
  ALIASES: {name: 'Aliases', state: 'patient.aliases'},
  ALPORT_CLINICAL_PICTURES: {name: 'Clinical Pictures', state: 'patient.alportClinicalPictures'},
  COHORTS: {name: 'Cohorts', state: 'patient.cohorts'},
  CONSULTANTS: {name: 'Consultants', state: 'patient.consultants'},
  DEMOGRAPHICS: {name: 'Demographics', state: 'patient.demographics'},
  DIAGNOSES: {name: 'Comorbidities', state: 'patient.diagnoses', cohort: true},
  DIALYSIS: {name: 'Dialysis', state: 'patient.dialysis'},
  FAMILY_HISTORY: {name: 'Family History', state: 'patient.familyHistory', cohort: true},
  FETAL_ANOMALY_SCANS: {name: 'Fetal Anomaly Scans', state: 'patient.fetalAnomalyScans'},
  FETAL_ULTRASOUNDS: {name: 'Fetal Ultrasounds', state: 'patient.fetalUltrasounds'},
  FUAN_CLINICAL_PICTURES: {name: 'Clinical Pictures', state: 'patient.fuanClinicalPictures'},
  GENETICS: {name: 'Genetics', state: 'patient.genetics', cohort: true},
  HNF1B_CLINICAL_PICTURES: {name: 'Clinical Pictures', state: 'patient.hnf1bClinicalPictures'},
  HOSPITALISATIONS: {name: 'Hospitalisations', state: 'patient.hospitalisations'},
  HOSPITALS: {name: 'Hospitals', state: 'patient.hospitals'},
  INS_CLINICAL_PICTURES: {name: 'Clinical Pictures', state: 'patient.insClinicalPictures'},
  INS_RELAPSES: {name: 'Relapses', state: 'patient.insRelapses'},
  LIVER_DISEASES: {name: 'Liver Diseases', state: 'patient.liverDiseases'},
  LIVER_IMAGING: {name: 'Liver Imaging', state: 'patient.liverImaging'},
  LIVER_TRANSPLANTS: {name: 'Liver Transplants', state: 'patient.liverTransplants'},
  MEDICATIONS: {name: 'Medications', state: 'patient.medications'},
  META: {name: 'Metadata', state: 'patient.metadata'},
  MPGN_CLINICAL_PICTURES: {name: 'Clinical Pictures', state: 'patient.mpgnClinicalPictures'},
  NEPHRECTOMIES: {name: 'Nephrectomies', state: 'patient.nephrectomies'},
  NUMBERS: {name: 'Numbers', state: 'patient.numbers'},
  NUTRITION: {name: 'Nutrition', state: 'patient.nutrition'},
  PATHOLOGY: {name: 'Pathology', state: 'patient.pathology'},
  PLASMAPHERESIS: {name: 'Plasmapheresis', state: 'patient.plasmapheresis'},
  PREGNANCIES: {name: 'Pregnancies', state: 'patient.pregnancies'},
  PRIMARY_DIAGNOSIS: {name: 'Primary Diagnosis', state: 'patient.primaryDiagnosis', cohort: true},
  QUESTIONNAIRES: {name: 'Questionnaires', state: 'patient.questionnaires', cohort: true},
  RENAL_IMAGING: {name: 'Renal Imaging', state: 'patient.renalImaging'},
  RENAL_PROGRESSION: {name: 'Renal Disease Progression', state: 'patient.renalProgression'},
  RESULTS: {name: 'Lab Results', state: 'patient.results'},
  SALT_WASTING_CLINICAL_FEATURES: {name: 'Clinical Features', state: 'patient.saltWastingClinicalFeatures'},
  TRANSPLANTS: {name: 'Kidney Transplants', state: 'patient.transplants'},
};

function getPage(code, patient, group) {
  var page = PAGES[code];

  if (!page) {
    return null;
  }

  var stateParams = {
    patientId: patient.id
  };

  if (page.cohort) {
    stateParams.cohortId = group.id;
  }

  return {
    name: page.name,
    state: toStateString(page.state, stateParams)
  };
}

export default getPage;
