import filterObservationsByNumeric from './filter-observations-by-numeric';
import filterResultsByObservations from './filter-results-by-observations';
import groupResultsByObservation from './group-results-by-observation';

/**
 * Prepare results for display on a graph.
 *
 * @param {array} results - a list of results.
 * @param {array} observations - a list of observations.
 * @returns {array} - filtered and grouped results.
 */
function transformResultsForGraph(results, observations) {
  var filteredObservations = filterObservationsByNumeric(observations);
  var filteredResults = filterResultsByObservations(results, filteredObservations);
  var groups = groupResultsByObservation(filteredResults, filteredObservations);
  return groups;
}

export default transformResultsForGraph;
