import angular from 'angular';
import 'angular-mocks';
import '.';

describe('date time format', function() {
  beforeEach(angular.mock.module('radar.filters'));

  var filter;

  beforeEach(angular.mock.inject(function(_$filter_) {
    filter = _$filter_('dateTimeFormat');
  }));

  it('handles null', function() {
    expect(filter(null)).toBe('-');
  });

  it('handles undefined', function() {
    expect(filter(undefined)).toBe('-');
  });

  it('displays UTC in winter time', function() {
    expect(filter('2016-01-01T00:00:00+00:00')).toBe('01/01/2016 00:00:00 (UTC)');
  });

  it('displays UTC in summer time', function() {
    expect(filter('2016-07-01T00:00:00+00:00')).toBe('01/07/2016 00:00:00 (UTC)');
  });
});
