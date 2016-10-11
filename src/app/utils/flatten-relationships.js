/**
 * Flattens any child objects into just their id.
 *
 * @params data - the value to flatten.
 * @params {Integer} depth - internal value to keep track of recursion depth.
 * @returns the flattened value.
 */
function flattenRelationships(data, depth) {
  if (depth === undefined) {
    depth = 0;
  }

  var newData;

  if (angular.isArray(data)) { // Array
    newData = [];

    // Recurse into each value in the array
    _.each(data, function(value) {
      newData.push(flattenRelationships(value, depth + 1));
    });
  } else if (angular.isObject(data)) { // Object
    // Flatten any child objects with an id property
    if (depth > 0 && data.id !== undefined) {
      newData = data.id;
    } else {
      newData = {};

      // Recuse into each value of the object
      _.each(data, function(value, key) {
        newData[key] = flattenRelationships(value, depth + 1);
      });
    }
  } else { // Primitive
    newData = data;
  }

  return newData;
}

export default flattenRelationships;
