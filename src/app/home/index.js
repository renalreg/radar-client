import angular from 'angular';
import templateUrl from './home.html';

// They are imported here (not referenced in the template) so webpack hashes
// them via the asset/resource rule; html-loader can't process runtime src values.
import ukLogo from '../../radar.png';
import intlLogo from '../../radar-international.png';

const ENVIRONMENTS = ['local', 'staging', 'demo', 'international'];

const LOGOS = {
  uk: { src: ukLogo, width: 111, height: 30 },
  international: { src: intlLogo, width: 188, height: 46 }
};

function EnvironmentFactory($window) {
  // hostname (not href) so paths / query strings like "?ref=demo" can't accidentally change the detected environment.
  const host = $window.location.hostname.toLowerCase();
  const environment = ENVIRONMENTS.find(name => host.includes(name)) || 'live';

  return {
    environment,

    isLive: environment === 'live',
    isDemo: environment === 'demo',
    isStaging: environment === 'staging',
    isLocal: environment === 'local',
    isInternational: environment === 'international',

    // Label for the "This is the ___ system" paragraph (demo/staging/local)
    label: environment === 'demo' ? 'Demo' : 'Staging',

    logo: environment === 'international' ? LOGOS.international : LOGOS.uk
  };
}

EnvironmentFactory.$inject = ['$window'];

// Usage: <img radar-logo />
// Sets src, width and height for the current environment.
function radarLogo(Environment) {
  return {
    restrict: 'A',
    link(scope, element) {
      const { src, width, height } = Environment.logo;
      element.attr({ src, width, height });
    }
  };
}

radarLogo.$inject = ['Environment'];

function config($stateProvider) {
  $stateProvider.state('index', {
    url: '/',
    template: templateUrl,
    controller: 'HomeController as vm',
    data: { public: true }
  });
}

config.$inject = ['$stateProvider'];

function HomeController(Environment) {
  const vm = this;

  vm.env = Environment;

  // Kept so any remaining bindings (vm.isLive etc.) keep working
  vm.isDemo = Environment.isDemo;
  vm.isStaging = Environment.isStaging;
  vm.isLocal = Environment.isLocal;
  vm.isLive = Environment.isLive;
  vm.isInternational = Environment.isInternational;
}

HomeController.$inject = ['Environment'];

export default angular
  .module('radar.home', [])
  .config(config)
  .factory('Environment', EnvironmentFactory)
  .directive('radarLogo', radarLogo)
  .controller('HomeController', HomeController)
  .name;
