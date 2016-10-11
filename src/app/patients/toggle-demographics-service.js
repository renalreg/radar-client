import _ from 'lodash';

function toggleDemographicsService(session) {
  var visible = true;
  var callbacks = [];

  // Make demographics visible on login (don't preserve the previous user's setting)
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

  /** Toggle demographics visibility. */
  function toggle() {
    visible = !visible;
    broadcast();
    return visible;
  }

  /** Show demographics. */
  function show() {
    update(true);
  }

  /** Hide demographics. */
  function hide() {
    update(false);
  }

  /** True if demographics are visible. */
  function isVisible() {
    return visible;
  }

  /** True if demographics are hidden. */
  function isHidden() {
    return !visible;
  }

  /** Add a function to be called when the visibility of demographics is toggled. */
  function listen(callback) {
    callbacks.push(callback);

    return function() {
      _.pull(callbacks, callback);
    };
  }

  /** Update the demographics visibility. */
  function update(value) {
    if (visible !== value) {
      visible = value;
      broadcast();
    }
  }

  /** Notifiy listeners of a change. */
  function broadcast() {
    _.forEach(callbacks, function(callback) {
      callback(visible);
    });
  }
}

toggleDemographicsService.$inject = ['session'];

export default toggleDemographicsService;
