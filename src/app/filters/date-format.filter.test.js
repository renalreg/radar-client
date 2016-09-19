import angular from 'angular';
import 'angular-mocks';
import '.';

describe('date format', function() {
  beforeEach(angular.mock.module('radar.filters'));

  var filter;

  beforeEach(angular.mock.inject(function(_$filter_) {
    filter = _$filter_('dateFormat');
  }));

  it('handles null', function() {
    expect(filter(null)).toBe('-');
  });

  it('handles undefined', function() {
    expect(filter(undefined)).toBe('-');
  });

  it('displays a date', function() {
    expect(filter('2003-02-01')).toBe('01/02/2003');
  });
});
