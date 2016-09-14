function unsafeFilter($sce) {
  return $sce.trustAsHtml;
}

unsafeFilter.$inject = '$sce';

export default unsafeFilter;
