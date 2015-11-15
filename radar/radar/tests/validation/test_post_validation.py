from datetime import datetime

import pytest
import pytz
from freezegun import freeze_time

from radar.models.posts import Post
from radar.validation.core import ValidationError
from radar.validation.posts import PostValidation
from radar.tests.validation.helpers import validation_runner


@pytest.fixture
def post():
    obj = Post()
    obj.title = 'Hello'
    obj.body = '<p>This is a test!</p>'
    obj.published_date = datetime(2000, 1, 2, tzinfo=pytz.UTC)
    return obj


def test_valid(post):
    obj = valid(post)

    assert obj.title == 'Hello'
    assert obj.body == '<p>This is a test!</p>'
    assert obj.published_date == datetime(2000, 1, 2, tzinfo=pytz.UTC)

    assert obj.created_date is not None
    assert obj.modified_date is not None
    assert obj.created_user is not None
    assert obj.modified_user is not None


def test_title_missing(post):
    post.title = None
    invalid(post)


def test_title_blank(post):
    post.title = ''
    invalid(post)


def test_body_missing(post):
    post.body = None
    invalid(post)


def test_body_blank(post):
    post.body = ''
    invalid(post)


@freeze_time("2000-01-02")
def test_published_date_missing(post):
    post.published_date = None
    obj = valid(post)
    assert obj.published_date == datetime(2000, 1, 2, tzinfo=pytz.UTC)


def invalid(obj, **kwargs):
    with pytest.raises(ValidationError) as e:
        valid(obj, **kwargs)

    return e


def valid(obj, **kwargs):
    return validation_runner(Post, PostValidation, obj, **kwargs)