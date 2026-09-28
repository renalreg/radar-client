import hasPermissionForGroupFactory from '../src/app/permissions/has-permission-for-group';

const hasPermissionForGroup = hasPermissionForGroupFactory();
const makeGroup = (id) => ({ id });

const makeUser = ({ isAdmin = false, groups = [] } = {}) => ({ isAdmin, groups });

const makeGroupMembership = (group, permissions = []) => ({
  group,
  hasPermission: (perm) => permissions.includes(perm),
});

describe('hasPermissionForGroup', () => {
  test('denies when the user is not in the group', () => {
    const user = makeUser();

    expect(
      hasPermissionForGroup(user, makeGroup(1), 'VIEW_PATIENT')
    ).toBe(false);
  });

  test('denies when the user is in the group but lacks the permission', () => {
    const group = makeGroup(1);

    const user = makeUser({
      groups: [
        makeGroupMembership(group, [])
      ],
    });

    expect(
      hasPermissionForGroup(user, group, 'VIEW_PATIENT')
    ).toBe(false);
  });

  test('grants when the user is an admin (group membership irrelevant)', () => {
    const user = makeUser({ isAdmin: true });

    expect(
      hasPermissionForGroup(user, makeGroup(1), 'VIEW_PATIENT')
    ).toBe(true);
  });

  test('grants when the user is in the group with the permission', () => {
    const group = makeGroup(1);

    const user = makeUser({
      groups: [
        makeGroupMembership(group, ['VIEW_PATIENT'])
      ],
    });

    expect(
      hasPermissionForGroup(user, group, 'VIEW_PATIENT')
    ).toBe(true);
  });
});
