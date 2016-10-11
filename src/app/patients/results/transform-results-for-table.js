import filterResultsByObservations from './filter-results-by-observations';
import groupResults from './group-results';

function transformResultsForTable(results, observations) {
  var filteredResults = filterResultsByObservations(results, observations);
  var groups = groupResults(filteredResults);
  return groups;
}

export default transformResultsForTable;
