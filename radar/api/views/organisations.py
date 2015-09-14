from radar.api.serializers.organisations import OrganisationSerializer
from radar.lib.views.core import ListModelView
from radar.lib.models import Organisation


class OrganisationListView(ListModelView):
    serializer_class = OrganisationSerializer
    model_class = Organisation