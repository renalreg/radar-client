import random
from datetime import date

from radar.models.dialysis import Dialysis, DIALYSIS_MODALITIES
from radar_fixtures.utils import random_date
from radar_fixtures.validation import validate_and_add


def create_dialysis_f():
    def create_dialysis(patient, source_group, source_type, n):
        for _ in range(n):
            dialysis = Dialysis()
            dialysis.patient = patient
            dialysis.source_group = source_group
            dialysis.source_type = source_type
            dialysis.from_date = random_date(patient.earliest_date_of_birth, date.today())

            if random.random() > 0.5:
                dialysis.to_date = random_date(dialysis.from_date, date.today())

            dialysis.modality = random.choice(DIALYSIS_MODALITIES.keys())

            validate_and_add(dialysis)

    return create_dialysis
