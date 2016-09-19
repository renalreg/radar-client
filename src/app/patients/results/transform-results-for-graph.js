function transformResultsForGraph(
  filterObservationsByNumeric,
  filterResultsByObservations,
  groupResultsByObservation
) {
  return function transformResultsForGraph(results, observations) {
    var filteredObservations = filterObservationsByNumeric(observations);
    var filteredResults = filterResultsByObservations(results, filteredObservations);
    var groups = groupResultsByObservation(filteredResults, filteredObservations);
    return groups;
  };
}

transformResultsForGraph.$inject = [
  'filterObservationsByNumeric',
  'filterResultsByObservations',
  'groupResultsByObservation'
];

export default transformResultsForGraph;
