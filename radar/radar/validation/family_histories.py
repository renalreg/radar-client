from radar.validation.groups import CohortGroupValidationMixin
from radar.validation.core import Field, Validation
from radar.validation.meta import MetaValidationMixin
from radar.validation.patients import PatientValidationMixin
from radar.validation.validators import required, none_if_blank, optional, max_length, in_
from radar.validation.core import ListField
from radar.models.family_histories import RELATIONSHIPS


class FamilyHistoryRelativeValidation(Validation):
    relationship = Field([required(), in_(RELATIONSHIPS.keys())])
    patient = Field([optional()])  # TODO check not own relative


class FamilyHistoryValidation(PatientValidationMixin, CohortGroupValidationMixin, MetaValidationMixin, Validation):
    parental_consanguinity = Field([required()])
    family_history = Field([required()])
    other_family_history = Field([none_if_blank(), optional(), max_length(10000)])
    relatives = ListField(FamilyHistoryRelativeValidation())

    def pre_validate(self, obj):
        if not obj.family_history:
            obj.relatives = []

        return obj