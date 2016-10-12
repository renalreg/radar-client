import angular from 'angular';

import cohortNavigation from './cohort-navigation.directive';
import patientNavigation from './patient-navigation.directive';
import systemNavigation from './system-navigation.directive';

export default angular.module('radar.patients.navigation', [])
  .directive('cohortNavigation', cohortNavigation)
  .directive('patientNavigation', patientNavigation)
  .directive('systemNavigation', systemNavigation)
  .name;
