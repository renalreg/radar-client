from radar_api.serializers.data_sources import DataSourceSerializerMixin
from radar_api.serializers.meta import MetaSerializerMixin
from radar_api.serializers.patient_mixins import PatientSerializerMixin
from radar.serializers.models import ModelSerializer, ReferenceField
from radar.models import DialysisType, Dialysis


class DialysisTypeSerializer(ModelSerializer):
    class Meta(object):
        model_class = DialysisType


class DialysisTypeReferenceField(ReferenceField):
    model_class = DialysisType
    serializer_class = DialysisTypeSerializer


class DialysisSerializer(MetaSerializerMixin, PatientSerializerMixin, DataSourceSerializerMixin, ModelSerializer):
    dialysis_type = DialysisTypeReferenceField()

    class Meta(object):
        model_class = Dialysis
        exclude = ['dialysis_type_id']