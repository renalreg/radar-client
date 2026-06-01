import angular from 'angular';
import 'angular-mocks';
import '.';

describe('missing', function() {
  beforeEach(angular.mock.module('radar.filters'));

  var filter;

  beforeEach(angular.mock.inject(function(_$filter_) {
    filter = _$filter_('missing');
  }));

  it('handles null', function() {
    expect(filter(null)).toBe('-');
  });

  it('handles undefined', function() {
    expect(filter(undefined)).toBe('-');
  });

  it('handles blank', function() {
    expect(filter('')).toBe('-');
  });

  it('handles zero', function() {
    expect(filter(0)).toBe(0);
  });
});
