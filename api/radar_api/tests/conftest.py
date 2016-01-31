import pytest

from radar_api.app import create_app
from radar.database import db
from radar_api.tests.client import TestClient
from radar_api.tests.fixtures import create_fixtures


@pytest.fixture(scope='session')
def app():
    app = create_app({
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': 'postgres://postgres@localhost/radar_test',
        'BASE_URL': 'http://localhost',
        'PASSWORD_HASH_METHOD': 'pbkdf2:sha1:1',
    })

    app.test_client_class = TestClient

    return app


@pytest.yield_fixture(scope='session')
def tables(app):
    with app.app_context():
        db.drop_all()
        db.create_all()

        # TODO UnboundExecutionError without this
        db.session = db.create_scoped_session(options=dict(bind=db.engine))

        # Create fixtures here so the tests run faster
        # TODO should probably be changed so tests can have different fixtures
        create_fixtures()
        db.session.commit()

        yield db

        db.drop_all()


@pytest.yield_fixture(scope='function', autouse=True)
def session(app, tables):
    with app.app_context():
        connection = db.engine.connect()
        transaction = connection.begin()
        session = db.create_scoped_session(options=dict(bind=connection, binds={}))
        db.session = session

        yield session

        transaction.rollback()
        connection.close()
        session.remove()