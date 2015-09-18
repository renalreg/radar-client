from radar.lib.data.comorbidities import create_disorders
from radar.lib.data.data_sources import create_data_sources
from radar.lib.data.diagnoses import create_cohort_diagnoses
from radar.lib.data.dialysis import create_dialysis_types
from radar.lib.data.cohorts import create_cohorts
from radar.lib.data.results import create_result_definitions, create_result_group_definitions
from radar.lib.data.patients import create_ethnicity_codes
from radar.lib.data.organisations import create_organisations


def create_initial_data():
    create_organisations()
    create_data_sources()

    create_result_definitions()
    create_result_group_definitions()

    create_cohorts()
    create_cohort_diagnoses()

    create_ethnicity_codes()
    create_dialysis_types()
    create_disorders()