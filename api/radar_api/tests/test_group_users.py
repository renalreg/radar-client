import json

import pytest

from radar_api.tests.fixtures import get_user, create_user, get_group, add_user_to_group
from radar.roles import ROLE
from radar.models.groups import GROUP_TYPE


@pytest.mark.parametrize(['username', 'group_type', 'group_code', 'role', 'expected'], [
    ('admin', GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.SENIOR_CLINICIAN, 200),
    ('admin', GROUP_TYPE.COHORT, 'COHORT1', ROLE.SENIOR_RESEARCHER, 200),

    ('hospital1_clinician', GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.CLINICIAN, 403),
    ('hospital1_clinician', GROUP_TYPE.COHORT, 'COHORT1', ROLE.RESEARCHER, 403),

    ('null', GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.CLINICIAN, 403),
    ('null', GROUP_TYPE.COHORT, 'COHORT1', ROLE.RESEARCHER, 403),

    ('hospital1_senior_clinician', GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.CLINICIAN, 200),
    ('hospital1_senior_clinician', GROUP_TYPE.HOSPITAL, 'HOSPITAL2', ROLE.CLINICIAN, 403),
    ('hospital1_senior_clinician', GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.SENIOR_CLINICIAN, 403),
    ('hospital1_senior_clinician', GROUP_TYPE.COHORT, 'COHORT1', ROLE.RESEARCHER, 403),
])
def test_create_group_user(app, username, group_type, group_code, role, expected):
    user = get_user(username)
    group = get_group(group_type, group_code)
    other_user = create_user('test')

    client = app.test_client()
    client.login(user)

    response = client.post('/group-users', data={
        'group': group.id,
        'user': other_user.id,
        'role': str(role),
    })

    assert response.status_code == expected


@pytest.mark.parametrize(['username', 'group_type', 'group_code', 'role', 'expected'], [
    ('admin', GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.SENIOR_CLINICIAN, 200),
    ('admin', GROUP_TYPE.COHORT, 'COHORT1', ROLE.SENIOR_RESEARCHER, 200),

    ('hospital1_clinician', GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.CLINICIAN, 403),
    ('hospital1_clinician', GROUP_TYPE.COHORT, 'COHORT1', ROLE.RESEARCHER, 403),

    ('null', GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.CLINICIAN, 403),
    ('null', GROUP_TYPE.COHORT, 'COHORT1', ROLE.RESEARCHER, 403),

    ('hospital1_senior_clinician', GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.CLINICIAN, 200),
    ('hospital1_senior_clinician', GROUP_TYPE.HOSPITAL, 'HOSPITAL2', ROLE.CLINICIAN, 403),
    ('hospital1_senior_clinician', GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.SENIOR_CLINICIAN, 403),
    ('hospital1_senior_clinician', GROUP_TYPE.COHORT, 'COHORT1', ROLE.RESEARCHER, 403),
])
def test_delete_group_user(app, username, group_type, group_code, role, expected):
    user = get_user(username)

    other_user = create_user('test')
    group = get_group(group_type, group_code)
    group_user = add_user_to_group(other_user, group, role)

    client = app.test_client()
    client.login(user)

    response = client.delete('/group-users/%s' % group_user.id)

    assert response.status_code == expected


@pytest.mark.parametrize(['username', 'group_type', 'group_code', 'role', 'expected'], [
    ('admin', GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.SENIOR_CLINICIAN, True),
    ('admin', GROUP_TYPE.COHORT, 'COHORT1', ROLE.SENIOR_RESEARCHER, True),

    ('hospital1_clinician', GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.CLINICIAN, False),
    ('hospital1_clinician', GROUP_TYPE.COHORT, 'COHORT1', ROLE.RESEARCHER, False),

    ('null', GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.CLINICIAN, False),
    ('null', GROUP_TYPE.COHORT, 'COHORT1', ROLE.RESEARCHER, False),

    ('hospital1_senior_clinician', GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.CLINICIAN, True),
    ('hospital1_senior_clinician', GROUP_TYPE.HOSPITAL, 'HOSPITAL2', ROLE.CLINICIAN, True),
    ('hospital1_senior_clinician', GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.SENIOR_CLINICIAN, True),
    ('hospital1_senior_clinician', GROUP_TYPE.COHORT, 'COHORT1', ROLE.RESEARCHER, True),
])
def test_read_group_user(app, username, group_type, group_code, role, expected):
    user = get_user(username)

    other_user = create_user('test')
    group = get_group(group_type, group_code)
    group_user = add_user_to_group(other_user, group, role)

    client = app.test_client()
    client.login(user)

    response = client.get('/group-users/%s' % group_user.id)

    if expected:
        assert response.status_code == 200
    else:
        assert response.status_code == 403

    response = client.get('/group-users?user=%s' % other_user.id)

    assert response.status_code == 200

    data = json.loads(response.data)
    results = len(data['data'])

    if expected:
        assert results == 1
    else:
        assert results == 0


@pytest.mark.parametrize([
    'username',
    'old_group_type', 'old_group_code', 'old_role',
    'new_group_type', 'new_group_code', 'new_role',
    'expected'
], [
    (
        'admin',
        GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.CLINICIAN,
        GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.SENIOR_CLINICIAN,
        200
    ),
    (
        'admin',
        GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.CLINICIAN,
        GROUP_TYPE.HOSPITAL, 'HOSPITAL2', ROLE.SENIOR_CLINICIAN,
        200
    ),
    (
        'hospital1_clinician',
        GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.CLINICIAN,
        GROUP_TYPE.HOSPITAL, 'HOSPITAL2', ROLE.SENIOR_CLINICIAN,
        403
    ),
    (
        'hospital2_clinician',
        GROUP_TYPE.COHORT, 'COHORT1', ROLE.RESEARCHER,
        GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.CLINICIAN,
        403
    ),
    (
        'hospital_senior_clinician',
        GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.CLINICIAN,
        GROUP_TYPE.HOSPITAL, 'HOSPITAL2', ROLE.CLINICIAN,
        200
    ),
    (
        'hospital_senior_clinician',
        GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.CLINICIAN,
        GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.SENIOR_CLINICIAN,
        403
    ),
    (
        'hospital_senior_clinician',
        GROUP_TYPE.COHORT, 'COHORT1', ROLE.RESEARCHER,
        GROUP_TYPE.HOSPITAL, 'HOSPITAL1', ROLE.CLINICIAN,
        403
    ),
    (
        'null',
        GROUP_TYPE.COHORT, 'COHORT1', ROLE.RESEARCHER,
        GROUP_TYPE.COHORT, 'COHORT2', ROLE.RESEARCHER,
        403
    ),
])
def test_update_group_user(
    app,
    username,
    old_group_type, old_group_code, old_role,
    new_group_type, new_group_code, new_role,
    expected
):
    user = get_user(username)

    other_user = create_user('test')
    old_group = get_group(old_group_type, old_group_code)
    group_user = add_user_to_group(other_user, old_group, old_role)

    new_group = get_group(new_group_type, new_group_code)

    client = app.test_client()
    client.login(user)

    response = client.post('/group-users/%s' % group_user.id, data={
        'group': new_group.id,
        'role': str(new_role),
    })

    assert response.status_code == expected


# TODO update self
# TODO create self
# TODO delete self
# TODO view self
