import angular from 'angular';

import addresses from './addresses';
import aliases from './aliases';
import alport from './alport';
import cohorts from './cohorts';
import consultants from './consultants';
import demographics from './demographics';
import diagnoses from './diagnoses';
import dialysis from './dialysis';
import familyHistory from './family-history';
import fetalUltrasounds from './fetal-ultrasounds';
import fuan from './fuan';
import genetics from './genetics';
import hnf1b from './hnf1b';
import hospitalisations from './hospitalisations';
import hospitals from './hospitals';
import ins from './ins';
import pkd from './pkd';
import medications from './medications';
import metadata from './metadata';
import mpgn from './mpgn';
import navigation from './navigation';
import nephrectomies from './nephrectomies';
import numbers from './numbers';
import pathology from './pathology';
import plasmapheresis from './plasmapheresis';
import pregnancies from './pregnancies';
import renalProgression from './renal-progression';
import renalImaging from './renal-imaging';
import results from './results';
import saltWasting from './salt-wasting';
import transplants from './transplants';

export default angular.module('radar.patients', [
  addresses,
  aliases,
  alport,
  cohorts,
  consultants,
  demographics,
  diagnoses,
  dialysis,
  familyHistory,
  fetalUltrasounds,
  fuan,
  genetics,
  hnf1b,
  hospitalisations,
  hospitals,
  ins,
  pkd,
  medications,
  metadata,
  mpgn,
  navigation,
  nephrectomies,
  numbers,
  pathology,
  plasmapheresis,
  pregnancies,
  renalProgression,
  renalImaging,
  results,
  saltWasting,
  transplants
])
  .name;
