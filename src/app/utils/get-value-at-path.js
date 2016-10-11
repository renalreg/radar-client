/**
 * Gets the value of an object at the supplied path.
 *
 * @param {object} o - the object to get the value from.
 * @param {string} path - dot-separated path.
 * @returns {*} the value at the path.
 */
function getValueAtPath(o, path) {
  var paths = path.split('.');

  for (var i = 0; i < paths.length; i++) {
    o = o[paths[i]];

    if (o === undefined) {
      break;
    }
  }

  return o;
}

export default getValueAtPath;
