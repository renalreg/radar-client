import angular from 'angular';

import cohortNavigation from './cohort-navigation.directive';
import patientNavigation from './patient-navigation.directive';

export default angular.module('radar.patients.navigation', [])
  .directive('cohortNavigation', cohortNavigation)
  .directive('patientNavigation', patientNavigation)
  .name;
