import angular from 'angular';
import templateUrl from './home.html';

function config($stateProvider) {
  $stateProvider.state('index', {
    url: '/',
    templateUrl: templateUrl,
    controller: 'HomeController as vm',
    data: { public: true }
  });
}

config.$inject = ['$stateProvider'];

function HomeController($window) {
  const vm = this;

  const url = $window.location.href.toLowerCase();

  vm.isDemo = url.includes('demo');
  vm.isStaging = url.includes('staging');
  vm.isLocal = url.includes('local');

  vm.isLive = !(vm.isDemo || vm.isStaging || vm.isLocal);
}

HomeController.$inject = ['$window'];

export default angular
  .module('radar.home', [])
  .config(config)
  .controller('HomeController', HomeController)
  .name;
