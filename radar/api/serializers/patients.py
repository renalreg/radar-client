from radar.api.serializers.cohorts import CohortPatientSerializer, CohortReferenceField
from radar.api.serializers.meta import MetaSerializerMixin
from radar.api.serializers.organisations import OrganisationPatientSerializer, OrganisationReferenceField
from radar.lib.serializers import ModelSerializer, ListField, StringField, DateField, IntegerField, \
    Serializer, BooleanField, ReferenceField
from radar.lib.models import Patient


class PatientSerializer(MetaSerializerMixin, ModelSerializer):
    first_name = StringField()
    last_name = StringField()
    date_of_birth = DateField()
    year_of_birth = IntegerField()
    gender = StringField()
    organisations = ListField(field=OrganisationPatientSerializer(), source='organisation_patients')
    cohorts = ListField(field=CohortPatientSerializer(), source='cohort_patients')

    class Meta:
        model_class = Patient
        fields = ['id']


class PatientListRequestSerializer(Serializer):
    id = IntegerField()
    first_name = StringField()
    last_name = StringField()
    date_of_birth = DateField()
    year_of_birth = IntegerField()
    date_of_death = DateField()
    year_of_death = IntegerField()
    gender = StringField()
    patient_number = StringField()
    organisation_id = OrganisationReferenceField(write_only=True)
    cohort_id = CohortReferenceField(write_only=True)
    is_active = BooleanField()


class PatientReferenceField(ReferenceField):
    model_class = Patient


class PatientSerializerMixin(object):
    patient = PatientReferenceField()

    def get_model_exclude(self):
        attrs = super(PatientSerializerMixin, self).get_model_exclude()
        attrs.add('patient_id')
        return attrs