function getRadarGroup(systemStore) {
  return function getRadarGroup() {
    return systemStore.getCode('RADAR');
  }
}

getRadarGroup.$inject = ['systemStore'];

export default getRadarGroup;
