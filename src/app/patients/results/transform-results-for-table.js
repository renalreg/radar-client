import filterResultsByObservations from './filter-results-by-observations';
import groupResults from './group-results';

/**
 * Prepare the results for display in a table.
 *
 * @param {array} results - a list of results.
 * @param {array} observations - a list of observations.
 * @returns {array} - filtered and grouped results.
 */
function transformResultsForTable(results, observations) {
  var filteredResults = filterResultsByObservations(results, observations);
  var groups = groupResults(filteredResults);
  return groups;
}

export default transformResultsForTable;
