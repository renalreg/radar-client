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

  // isLive = true unless URL contains demo or staging
  vm.isLive = !(url.includes('demo') || url.includes('staging')|| url.includes('local'));
}

HomeController.$inject = ['$window'];

export default angular
  .module('radar.home', [])
  .config(config)
  .controller('HomeController', HomeController)
  .name;
