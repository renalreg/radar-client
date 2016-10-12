/**
 * Swaps two elements in an array.
 *
 * @param {Array} array - input array.
 * @param {Integer} x - first index into array.
 * @param {Integer} y - second index into array.
 * @returns {undefined}
 */
function swap(array, x, y) {
  var temp = array[x];
  array[x] = array[y];
  array[y] = temp;
}

export default swap;
