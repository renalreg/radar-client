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

  /**
   * Toggle demographics visibility.
   *
   * @returns {boolean} - new visibility.
   */
  function toggle() {
    visible = !visible;
    broadcast();
    return visible;
  }

  /**
   * Show demographics.
   *
   * @returns {undefined}
   */
  function show() {
    update(true);
  }

  /**
   * Hide demographics.
   *
   * @returns {undefined}
   */
  function hide() {
    update(false);
  }

  /**
   * True if demographics are visible.
   *
   * @returns {boolean} - true if demographics are visible.
   */
  function isVisible() {
    return visible;
  }

  /**
   * True if demographics are hidden.
   *
   * @returns {boolean} - true if demographics are hidden.
   */
  function isHidden() {
    return !visible;
  }

  /**
   * Add a function to be called when the visibility of demographics is toggled.
   *
   * @param {function} callback - function that will be called when visibility changes.
   * @returns {function} - function to call to unsubscribe.
   */
  function listen(callback) {
    callbacks.push(callback);

    return function() {
      _.pull(callbacks, callback);
    };
  }

  /**
   * Update the demographics visibility.
   *
   * @param {boolean} value - new visibiility.
   * @returns {undefined}
   */
  function update(value) {
    if (visible !== value) {
      visible = value;
      broadcast();
    }
  }

  /**
   * Notifiy listeners of a change.
   *
   * @returns {undefined}
   */
  function broadcast() {
    _.forEach(callbacks, function(callback) {
      callback(visible);
    });
  }
}

toggleDemographicsService.$inject = ['session'];

export default toggleDemographicsService;
