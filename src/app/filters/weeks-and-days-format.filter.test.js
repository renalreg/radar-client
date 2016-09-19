import angular from 'angular';
import 'angular-mocks';
import '.';

describe('weeks and days format', function() {
  beforeEach(angular.mock.module('radar.filters'));

  var filter;

  beforeEach(angular.mock.inject(function(_$filter_) {
    filter = _$filter_('weeksAndDaysFormat');
  }));

  it('handles null', function() {
    expect(filter(null)).toBe('-');
  });

  it('handles undefined', function() {
    expect(filter(undefined)).toBe('-');
  });

  it('handles zero', function() {
    expect(filter(0)).toBe('0 days');
  });

  it('handles one day', function() {
    expect(filter(1)).toBe('1 day');
  });

  it('handles two days', function() {
    expect(filter(2)).toBe('2 days');
  });

  it('handles one week', function() {
    expect(filter(7)).toBe('1 week');
  });

  it('handles two weeks', function() {
    expect(filter(14)).toBe('2 weeks');
  });

  it('handles weeks and days', function() {
    expect(filter(123)).toBe('17 weeks, 4 days');
  });
});
