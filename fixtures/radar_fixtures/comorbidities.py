from radar_fixtures.validation import validate_and_add
from radar.models.comorbidities import Disorder

DISORDERS = [
    'Auto Immune Disease',
    'Blindness',
    'Cardiac Anomaly',
    'Cardiomyopathy',
    'CNS Abnormalities',
    'Congenital CMV',
    'Deafness',
    'Diabetes',
    'Hepatitis B',
    'Hepatitis C',
    'Male Pseudohermaphroditism',
    'Mental Retardation',
    'Microcephaly',
    'Microcoria',
    'Nail Patella Syndrome',
    'Polydactyly',
    'Spondyloepiphyseal Displasia',
    'TORCH Infection not CMV',
]


def create_disorders():
    for name in DISORDERS:
        disorder = Disorder()
        disorder.name = name
        validate_and_add(disorder)
