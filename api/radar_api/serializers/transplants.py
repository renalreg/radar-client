from radar_api.serializers.sources import SourceSerializerMixin
from radar_api.serializers.meta import MetaSerializerMixin
from radar_api.serializers.patient_mixins import PatientSerializerMixin
from radar.models.transplants import TRANSPLANT_MODALITIES, Transplant, TransplantRejection, TransplantBiopsy
from radar.serializers.models import ModelSerializer
from radar.serializers.fields import LabelledIntegerField
from radar.serializers.fields import ListField
from radar_api.serializers.groups import GroupReferenceField


class TransplantRejectionSerializer(ModelSerializer):
    class Meta(object):
        model_class = TransplantRejection
        exclude = ['id']


class TransplantBiopsySerializer(ModelSerializer):
    class Meta(object):
        model_class = TransplantBiopsy
        exclude = ['id']


class TransplantSerializer(PatientSerializerMixin, SourceSerializerMixin, MetaSerializerMixin, ModelSerializer):
    transplant_group = GroupReferenceField()
    modality = LabelledIntegerField(TRANSPLANT_MODALITIES)
    rejections = ListField(TransplantRejectionSerializer())
    biopsies = ListField(TransplantBiopsySerializer())

    class Meta(object):
        model_class = Transplant

    def create_rejection(self, deserialized_data):
        rejection = TransplantRejection()
        self.rejections.field.update(rejection, deserialized_data)
        return rejection

    def create_biopsy(self, deserialized_data):
        biopsy = TransplantBiopsy()
        self.biopsies.field.update(biopsy, deserialized_data)
        return biopsy

    def update(self, obj, deserialized_data):
        for attr, value in deserialized_data.items():
            if attr == 'rejections':
                obj.rejections = []

                for x in value:
                    rejection = self.create_rejection(x)
                    obj.rejections.append(rejection)
            elif attr == 'biopsies':
                obj.biopsies = []

                for x in value:
                    biopsy = self.create_biopsy(x)
                    obj.biopsies.append(biopsy)
            elif hasattr(obj, attr):
                setattr(obj, attr, value)

        return obj
