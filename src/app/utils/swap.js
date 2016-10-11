function swap(array, x, y) {
  var temp = array[x];
  array[x] = array[y];
  array[y] = temp;
}

export default swap;
