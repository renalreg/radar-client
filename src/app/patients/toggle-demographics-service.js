(function() {
  'use strict';

  var app = angular.module('radar.patients');

  app.factory('toggleDemographicsService', ['_', function(_) {
    var visible = true;
    var callbacks = [];

    return {
      toggle: toggle,
      show: show,
      hide: hide,
      listen: listen,
      isVisible: isVisible
    };

    function toggle() {
      visible = !visible;
      broadcast();
      return visible;
    }

    function show() {
      update(true);
    }

    function hide() {
      update(false);
    }

    function isVisible() {
      return visible;
    }

    function listen(callback) {
      callbacks.push(callback);
    }

    function update(value) {
      if (visible !== value) {
        visible = value;
        broadcast();
      }
    }

    function broadcast() {
      console.log(visible);

      _.forEach(callbacks, function(callback) {
        callback(visible);
      });
    }
  }]);
})();
