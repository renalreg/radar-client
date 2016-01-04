from sqlalchemy import MetaData, Table, Column, Integer, String, Date, ForeignKey,\
    DateTime
from sqlalchemy.dialects.postgresql import UUID

metadata = MetaData()

patients = Table(
    'patients', metadata,
    Column('id', Integer, primary_key=True),
    Column('created_user_id', Integer),
    Column('modified_user_id', Integer),
)

users = Table(
    'users', metadata,
    Column('id', Integer, primary_key=True),
    Column('username', String),
    Column('first_name', String),
    Column('last_name', String),
    Column('email', String),
)

patient_demographics = Table(
    'patient_demographics', metadata,
    Column('id', UUID, primary_key=True),
    Column('patient_id', Integer),
    Column('data_source_id', Integer),
    Column('first_name', String),
    Column('last_name', String),
    Column('date_of_birth', Date),
    Column('gender', Integer),
    Column('ethnicity', String),
    Column('home_number', String),
    Column('mobile_number', String),
    Column('created_user_id', Integer),
    Column('modified_user_id', Integer),
)

patient_addresses = Table(
    'patient_addresses', metadata,
    Column('id', UUID, primary_key=True),
    Column('patient_id', Integer),
    Column('data_source_id', Integer),
    Column('address1', String),
    Column('address2', String),
    Column('address3', Integer),
    Column('postcode', String),
    Column('created_user_id', Integer),
    Column('modified_user_id', Integer),
)

cohorts = Table(
    'cohorts', metadata,
    Column('id', Integer, primary_key=True),
    Column('code', String, primary_key=True),
    Column('name', String),
    Column('short_name', String),
)

organisations = Table(
    'organisations', metadata,
    Column('id', Integer, primary_key=True),
    Column('code', String),
    Column('type', String),
    Column('name', String),
    Column('recruitment', String),
)

data_sources = Table(
    'data_sources', metadata,
    Column('id', Integer, primary_key=True),
    Column('organisation_id', Integer, ForeignKey('organisations.id')),
    Column('type', String),
)

cohort_patients = Table(
    'cohort_patients', metadata,
    Column('id', Integer, primary_key=True),
    Column('cohort_id', Integer),
    Column('patient_id', Integer),
    Column('recruited_organisation_id', Integer),
    Column('created_user_id', Integer),
    Column('modified_user_id', Integer),
    Column('created_date', DateTime),
    Column('modified_date', DateTime),
)

organisation_patients = Table(
    'organisation_patients', metadata,
    Column('id', Integer, primary_key=True),
    Column('organisation_id', Integer),
    Column('patient_id', Integer),
    Column('created_user_id', Integer),
    Column('modified_user_id', Integer),
)

patient_numbers = Table(
    'patient_numbers', metadata,
    Column('id', UUID, primary_key=True),
    Column('patient_id', Integer),
    Column('data_source_id', Integer),
    Column('organisation_id', Integer),
    Column('number', String),
    Column('created_user_id', Integer),
    Column('modified_user_id', Integer),
)

cohort_features = Table(
    'cohort_features', metadata,
    Column('id', Integer, primary_key=True),
    Column('patient_id', Integer),
    Column('name', String),
    Column('weight', Integer),
)
