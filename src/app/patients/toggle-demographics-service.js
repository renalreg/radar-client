(function() {
  'use strict';

  var app = angular.module('radar.patients');

  app.factory('toggleDemographicsService', ['_', 'session', function(_, session) {
    var visible = true;
    var callbacks = [];

    session.on('login', function() {
      visible = true;
    });

    return {
      toggle: toggle,
      show: show,
      hide: hide,
      listen: listen,
      isVisible: isVisible,
      isHidden: isHidden
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

    function isHidden() {
      return !visible;
    }

    function listen(callback) {
      callbacks.push(callback);

      return function() {
        _.pull(callbacks, callback);
      };
    }

    function update(value) {
      if (visible !== value) {
        visible = value;
        broadcast();
      }
    }

    function broadcast() {
      _.forEach(callbacks, function(callback) {
        callback(visible);
      });
    }
  }]);
})();
