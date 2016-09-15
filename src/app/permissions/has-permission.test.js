import angular from 'angular';
import 'angular-mocks';
import '..';

describe('hasPermission', function() {
  beforeEach(angular.mock.module('radar'));

  var hasPermission;
  var store;

  beforeEach(angular.mock.inject(function(_hasPermission_, _store_) {
    hasPermission = _hasPermission_;
    store = _store_;
  }));

  it('denies when the user doesn\'t belong to a group with the permission', function() {
    var group = store.create('groups', {id: 1});
    var user = store.create('users', {groups: [
      {
        group: group,
        permissions: []
      }
    ]});
    expect(hasPermission(user, 'VIEW_PATIENT')).toBe(false);
  });

  it('grants when the user is an admin', function() {
    var user = store.create('users', {isAdmin: true});
    expect(hasPermission(user, 'VIEW_PATIENT')).toBe(true);
  });

  it('grants when the user belongs to a group with the permission', function() {
    var group = store.create('groups', {id: 1});
    var user = store.create('users', {groups: [
      {
        group: group,
        permissions: ['VIEW_PATIENT']
      }
    ]});
    expect(hasPermission(user, 'VIEW_PATIENT')).toBe(true);
  });
});
