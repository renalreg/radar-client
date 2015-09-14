from radar.lib.models import MEDICATION_DOSE_UNITS
from radar.lib.validation.core import Field, Validation, ValidationError, pass_new_obj
from radar.lib.validation.data_sources import DataSourceValidationMixin
from radar.lib.validation.patients import PatientValidationMixin
from radar.lib.validation.validators import valid_date_for_patient, required, optional, not_empty, min_, in_


class MedicationValidation(PatientValidationMixin, DataSourceValidationMixin, Validation):
    from_date = Field(chain=[required(), valid_date_for_patient()])
    to_date = Field(chain=[optional(), valid_date_for_patient()])
    name = Field(chain=[not_empty()])
    dose_quantity = Field(chain=[required(), min_(0)])
    dose_unit = Field(chain=[required(), in_(MEDICATION_DOSE_UNITS.keys())])
    frequency = Field(chain=[required()])
    route = Field(chain=[required()])

    @pass_new_obj
    def validate_to_date(self, obj, to_date):
        if to_date < obj.from_date:
            raise ValidationError('Must be on or after from date.')

        return to_date