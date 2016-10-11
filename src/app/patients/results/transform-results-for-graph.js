import filterObservationsByNumeric from './filter-observations-by-numeric';
import filterResultsByObservations from './filter-results-by-observations';
import groupResultsByObservation from './group-results-by-observation';

function transformResultsForGraph(results, observations) {
  var filteredObservations = filterObservationsByNumeric(observations);
  var filteredResults = filterResultsByObservations(results, filteredObservations);
  var groups = groupResultsByObservation(filteredResults, filteredObservations);
  return groups;
}

export default transformResultsForGraph;
