from radar.api.serializers.meta import MetaSerializerMixin
from radar.lib.models import Organisation, DataSource
from radar.lib.serializers import ModelSerializer, ReferenceField, Serializer, StringField


class OrganisationSerializer(MetaSerializerMixin, ModelSerializer):
    class Meta(object):
        model_class = Organisation


class DataSourceSerializer(ModelSerializer):
    organisation = OrganisationSerializer()

    class Meta(object):
        model_class = DataSource
        exclude = ['organisation_id']


class DataSourceReferenceField(ReferenceField):
    model_class = DataSource
    serializer_class = DataSourceSerializer


class DataSourceSerializerMixin(object):
    data_source = DataSourceReferenceField()

    def get_model_exclude(self):
        attrs = super(DataSourceSerializerMixin, self).get_model_exclude()
        attrs.add('data_source_id')
        return attrs


class DataSourceRequestSerializer(Serializer):
    type = StringField()
    organisation_code = StringField()
    organisation_type = StringField()
