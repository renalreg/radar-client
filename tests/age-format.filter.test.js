import angular from 'angular';
import 'angular-mocks';
import '.';

describe('age format', function() {
  beforeEach(angular.mock.module('radar.filters'));

  var filter;

  beforeEach(angular.mock.inject(function(_$filter_) {
    filter = _$filter_('ageFormat');
  }));

  it('handles null', function() {
    expect(filter(null)).toBe('-');
  });

  it('handles undefined', function() {
    expect(filter(undefined)).toBe('-');
  });

  it('handles zero', function() {
    expect(filter(0)).toBe('0 years');
  });

  it('handles one month', function() {
    expect(filter(1)).toBe('0 years, 1 month');
  });

  it('handles less than a year', function() {
    expect(filter(6)).toBe('0 years, 6 months');
  });

  it('handles one year', function() {
    expect(filter(12)).toBe('1 year');
  });

  it('handles years and months', function() {
    expect(filter(18)).toBe('1 year, 6 months');
  });

  it('handles years', function() {
    expect(filter(120)).toBe('10 years');
  });
});
