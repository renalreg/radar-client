#!/bin/sh

set -e

table_names="
alport_clinical_pictures
consultants
diagnoses
dialysis
drugs
family_histories
family_history_relatives
fetal_anomaly_scans
fetal_ultrasounds
genetics
group_consultants
group_diagnoses
group_patients
group_users
groups
hnf1b_clinical_pictures
hospitalisations
ins_clinical_pictures
ins_relapses
medications
mpgn_clinical_pictures
nephrectomies
observations
pathology
patient_addresses
patient_aliases
patient_consultants
patient_demographics
patient_diagnoses
patient_numbers
patients
plasmapheresis
posts
pregnancies
renal_imaging
results
salt_wasting_clinical_features
transplant_biopsies
transplant_rejections
transplants
user_sessions
users
"

for table_name in $table_names; do
  ./log_changes_trigger.sh $table_name
done