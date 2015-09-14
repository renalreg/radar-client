from radar.lib.validation.core import Validation
from radar.lib.validation.data_sources import DataSourceValidationMixin
from radar.lib.validation.patients import PatientValidationMixin


# TODO
class PatientAliasValidation(PatientValidationMixin, DataSourceValidationMixin, Validation):
    pass