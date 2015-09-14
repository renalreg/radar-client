from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash

from radar.lib.models.common import ModifiedMixin, CreatedMixin
from radar.lib.database import db


class UserCreatedMixin(CreatedMixin):
    @declared_attr
    def created_user(cls):
        return relationship('User', primaryjoin="User.id == %s.created_user_id" % cls.__name__, remote_side='User.id', post_update=True)


class UserModifiedMixin(ModifiedMixin):
    @declared_attr
    def modified_user(cls):
        return relationship('User', primaryjoin="User.id == %s.modified_user_id" % cls.__name__, remote_side='User.id', post_update=True)


class User(db.Model, UserCreatedMixin, UserModifiedMixin):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False, unique=True)
    password_hash = Column(String, nullable=False)
    email = Column(String, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    is_admin = Column(Boolean, default=False, nullable=False, server_default='0')

    reset_password_token = Column(String)
    reset_password_date = Column(DateTime)

    force_password_change = Column(Boolean, default=False, nullable=False, server_default='0')

    organisation_users = relationship('OrganisationUser', back_populates='user')
    cohort_users = relationship('CohortUser', back_populates='user')

    @property
    def organisations(self):
        return [x.organisation for x in self.organisation_users]

    @property
    def cohorts(self):
        return [x.cohort for x in self.cohort_users]

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        self.reset_password_token = None
        self.force_password_change = False

    def set_initial_password(self, password):
        self.set_password(password)
        self.force_password_change = True

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def is_authenticated(self):
        return True


class AnonymousUser(object):
    def is_authenticated(self):
        return False