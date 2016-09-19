function transformResultsForTable(
  filterResultsByObservations,
  groupResults
) {
  return function transformResultsForTable(results, observations) {
    var filteredResults = filterResultsByObservations(results, observations);
    var groups = groupResults(filteredResults);
    return groups;
  };
}

transformResultsForTable.$inject = [
  'filterResultsByObservations',
  'groupResults'
];

export default transformResultsForTable;
