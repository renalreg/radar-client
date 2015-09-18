from radar.lib.validation.core import Field, Validation, ValidationError, pass_new_obj
from radar.lib.validation.data_sources import DataSourceValidationMixin
from radar.lib.validation.meta import MetaValidationMixin
from radar.lib.validation.patients import PatientValidationMixin
from radar.lib.validation.validators import valid_date_for_patient, required, optional, not_empty


class ComorbidityValidation(PatientValidationMixin, DataSourceValidationMixin, MetaValidationMixin, Validation):
    from_date = Field([required(), valid_date_for_patient()])
    to_date = Field([optional(), valid_date_for_patient()])
    disorder = Field([required()])

    @pass_new_obj
    def validate_to_date(self, obj, to_date):
        if to_date < obj.from_date:
            raise ValidationError('Must be on or after from date.')

        return to_date


class DisorderValidation(Validation):
    label = Field([not_empty()])