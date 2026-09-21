import hasPermissionForPatientFactory from '../src/app/permissions/has-permission-for-patient';

const hasPermissionForPatient = hasPermissionForPatientFactory();

const makeGroup = (id) => ({ id });

const makeUser = ({ isAdmin = false, groups = [] } = {}) => ({
  isAdmin,
  groups,
});

const makePatient = ({ groups = [] } = {}) => ({
  groups,
});

// helper that matches production expectation
const makeUserGroup = (group, permissions = []) => ({
  group,
  hasPermission: (perm) => permissions.includes(perm),
});

describe('hasPermissionForPatient', () => {
  test('denies when the user and patient share no groups', () => {
    const group1 = makeGroup(1);
    const group2 = makeGroup(2);

    const user = makeUser({
      groups: [
        makeUserGroup(group1, ['VIEW_PATIENT']),
      ],
    });

    const patient = makePatient({
      groups: [{ group: group2 }],
    });

    expect(
      hasPermissionForPatient(user, patient, 'VIEW_PATIENT')
    ).toBe(false);
  });

  test('denies when the user is in a shared group but lacks the permission', () => {
    const group = makeGroup(1);

    const user = makeUser({
      groups: [
        makeUserGroup(group, []),
      ],
    });

    const patient = makePatient({
      groups: [{ group }],
    });

    expect(
      hasPermissionForPatient(user, patient, 'VIEW_PATIENT')
    ).toBe(false);
  });

  test('grants when the user is an admin', () => {
    const user = makeUser({ isAdmin: true });
    const patient = makePatient();

    expect(
      hasPermissionForPatient(user, patient, 'VIEW_PATIENT')
    ).toBe(true);
  });

  test('grants when the user shares a group with the patient and has the permission', () => {
    const group = makeGroup(1);

    const user = makeUser({
      groups: [
        makeUserGroup(group, ['VIEW_PATIENT']),
      ],
    });

    const patient = makePatient({
      groups: [{ group }],
    });

    expect(
      hasPermissionForPatient(user, patient, 'VIEW_PATIENT')
    ).toBe(true);
  });
});
