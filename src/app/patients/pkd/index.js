import angular from 'angular';

import liverImagingTemplateUrl from './liver-imaging.html';
import liverTransplantsTemplateUrl from './liver-transplants.html';
import liverDiseasesTemplateUrl from './liver-diseases.html';
import nutritionTemplateUrl from './nutrition.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerMixin('liver-imaging', 'SourceModelMixin');
  storeProvider.registerMixin('liver-transplants', 'SourceModelMixin');
  storeProvider.registerMixin('nutrition', 'SourceModelMixin');

  $stateProvider.state('patient.liverImaging', {
    url: '/liver-imaging',
    templateUrl: liverImagingTemplateUrl
  });

  $stateProvider.state('patient.liverTransplants', {
    url: '/liver-transplants',
    templateUrl: liverTransplantsTemplateUrl
  });

  $stateProvider.state('patient.liverDiseases', {
    url: '/liver-diseases',
    templateUrl: liverDiseasesTemplateUrl
  });

  $stateProvider.state('patient.nutrition', {
    url: '/nutrition',
    templateUrl: nutritionTemplateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.pkd', [])
  .config(config)
  .name;
