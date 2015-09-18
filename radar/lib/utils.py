from datetime import datetime, date, timedelta
import re

import dateutil.parser
import pytz
from sqlalchemy import and_


def get_path(data, keys):
    for key in keys:
        data = data.get(key)

        if data is None:
            return None

    return data


def get_path_as_text(data, keys):
    value = get_path(data, keys)

    if value is not None:
        value = str(value)

    return value


def get_path_as_datetime(data, keys):
    value = get_path_as_text(data, keys)

    if value is not None:
        value = dateutil.parser.parse(value)

    return value


def optional_int(value):
    if not value:
        return None

    return int(value)


def set_path(data, keys, value):
    for key in keys[:-1]:
        if key not in data:
            data[key] = {}

        data = data[key]

    data[keys[-1]] = value


def date_to_datetime(d):
    return datetime(year=d.year, month=d.month, day=d.day, tzinfo=pytz.utc)


def is_date(x):
    return isinstance(x, date) and not isinstance(x, datetime)


def is_datetime(x):
    return isinstance(x, datetime)


def datetime_to_date(dt):
    return date(dt.year, dt.month, dt.day)


def sql_date_filter(column, date):
    return and_(
        column >= date,
        column < date + timedelta(days=1)
    )


def sql_year_filter(column, year):
    return and_(
        column >= datetime(year, 1, 1),
        column < datetime(year + 1, 1, 1)
    )