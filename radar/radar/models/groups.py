from datetime import datetime

from enum import Enum
from sqlalchemy import Column, Integer, String, ForeignKey, Index, DateTime, and_, or_, func, null, text, Boolean
from sqlalchemy.orm import relationship, backref
from sqlalchemy.dialects import postgresql
from sqlalchemy.ext.hybrid import hybrid_property
import pytz

from radar.database import db
from radar.roles import ROLE, PERMISSION, get_roles_with_permission, get_roles_managed_by_role
from radar.models.common import MetaModelMixin, patient_id_column, patient_relationship
from radar.pages import PAGE
from radar.models.types import EnumType, EnumToStringType
from radar.models.logs import log_changes


class GROUP_TYPE(Enum):
    HOSPITAL = 'HOSPITAL'
    COHORT = 'COHORT'
    OTHER = 'OTHER'

    def __str__(self):
        return str(self.value)


GROUP_CODE_UKRDC = 'UKRDC'
GROUP_CODE_UKRR = 'UKRR'
GROUP_CODE_RADAR = 'RADAR'
GROUP_CODE_NHS = 'NHS'
GROUP_CODE_CHI = 'CHI'
GROUP_CODE_HANDC = 'HANDC'
GROUP_CODE_NHSBT = 'NHSBT'
GROUP_CODE_BAPN = 'BAPN'


@log_changes
class Group(db.Model):
    __tablename__ = 'groups'

    id = Column(Integer, primary_key=True)
    type = Column(EnumType(GROUP_TYPE, name='group_type'), nullable=False)
    code = Column(String, nullable=False)
    name = Column(String, nullable=False)
    short_name = Column(String, nullable=False)
    recruitment = Column(Boolean, nullable=False, default=False, server_default=text('false'))

    # https://bitbucket.org/zzzeek/sqlalchemy/issues/3467/array-of-enums-does-not-allow-assigning
    pages = Column('pages', postgresql.ARRAY(EnumToStringType(PAGE)))
    instructions = Column(String)
    multiple_diagnoses = Column(Boolean, nullable=False, default=False, server_default=text('false'))

    @property
    def patients(self):
        return [x.patient for x in self.group_patient]

    @property
    def users(self):
        return [x.user for x in self.group_users]

Index('groups_code_type_idx', Group.code, Group.type, unique=True)


@log_changes
class GroupPatient(db.Model, MetaModelMixin):
    __tablename__ = 'group_patients'

    id = Column(Integer, primary_key=True)

    group_id = Column(Integer, ForeignKey('groups.id'), nullable=False)
    group = relationship('Group', foreign_keys=[group_id], backref=backref('group_patients', cascade='all, delete-orphan', passive_deletes=True))

    patient_id = patient_id_column()
    patient = patient_relationship('group_patients')

    from_date = Column(DateTime(timezone=True), nullable=False)
    to_date = Column(DateTime(timezone=True))

    created_group_id = Column(Integer, ForeignKey('groups.id'), nullable=False)
    created_group = relationship('Group', foreign_keys=[created_group_id])

    @hybrid_property
    def current(self):
        now = datetime.now(pytz.UTC)
        return (self.from_date <= now and (self.to_date is None or self.to_date >= now))

    @current.expression
    def current(cls):
        return and_(cls.from_date <= func.now(), or_(cls.to_date == null(), cls.to_date >= func.now()))

Index('group_patients_group_idx', GroupPatient.group_id)
Index('group_patients_patient_idx', GroupPatient.patient_id)


@log_changes
class GroupUser(db.Model, MetaModelMixin):
    __tablename__ = 'group_users'

    id = Column(Integer, primary_key=True)

    group_id = Column(Integer, ForeignKey('groups.id'), nullable=False)
    group = relationship('Group', backref=backref('group_users', cascade='all, delete-orphan', passive_deletes=True))

    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    user = relationship('User', foreign_keys=[user_id])
    role = Column(EnumType(ROLE, name='role'), nullable=False)

    def has_permission(self, permission):
        permission_method = permission.value.lower()
        grant = getattr(self, 'has_' + permission_method + '_permission', None)

        if grant is None:
            roles = get_roles_with_permission(permission)
            grant = self.role in roles

        return grant

    @property
    def permissions(self):
        return [x for x in PERMISSION if self.has_permission(x)]

    @property
    def has_edit_user_membership_permission(self):
        return len(self.managed_roles) > 0

    @property
    def managed_roles(self):
        return get_roles_managed_by_role(self.role)

Index('group_users_group_idx', GroupUser.group_id)
Index('group_users_user_idx', GroupUser.user_id)
Index('group_patients_group_user_role_idx', GroupUser.group_id, GroupUser.user_id, GroupUser.role, unique=True)