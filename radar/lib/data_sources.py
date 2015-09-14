from radar.lib.models import DataSource, Organisation, ORGANISATION_CODE_RADAR, ORGANISATION_TYPE_OTHER

DATA_SOURCE_TYPE_RADAR = 'RADAR'
DATA_SOURCE_TYPE_PV = 'PV'

DATA_SOURCE_TYPES = [
    DATA_SOURCE_TYPE_RADAR,
    DATA_SOURCE_TYPE_PV
]


def get_radar_data_source():
    return DataSource.query\
        .join(DataSource.organisation)\
        .filter(DataSource.type == DATA_SOURCE_TYPE_RADAR)\
        .filter(Organisation.type == ORGANISATION_TYPE_OTHER)\
        .filter(Organisation.code == ORGANISATION_CODE_RADAR)\
        .one()