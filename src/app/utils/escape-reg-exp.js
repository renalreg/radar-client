/**
 * Escape a string for use in a regex.
 *
 * @param {string} string - the string to escape.
 * @returns {string} the escaped string.
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default escapeRegExp;
