/**
 * Escape a string for use in a regex.
 *
 * @param {String} string - the string to escape.
 * @returns the escaped string.
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default escapeRegExp;
