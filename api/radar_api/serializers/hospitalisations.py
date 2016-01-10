from radar_api.serializers.sources import SourceGroupSerializerMixin
from radar_api.serializers.meta import MetaSerializerMixin
from radar_api.serializers.patient_mixins import PatientSerializerMixin
from radar.serializers.models import ModelSerializer
from radar.models import Hospitalisation


class HospitalisationSerializer(MetaSerializerMixin, PatientSerializerMixin, SourceGroupSerializerMixin, ModelSerializer):
    class Meta(object):
        model_class = Hospitalisation
