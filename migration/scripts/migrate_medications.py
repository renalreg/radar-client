from sqlalchemy import text, create_engine
import click

from radar_migration import Migration, tables, EXCLUDED_UNITS


def migrate_medications(old_conn, new_conn):
    m = Migration(new_conn)

    rows = old_conn.execute(text("""
        SELECT
            patient.radarNo,
            startdate,
            enddate,
            name,
            dose,
            unitcode
        FROM medicine
        JOIN patient ON medicine.nhsno = patient.nhsno
        WHERE
            patient.radarNo is not NULL AND
            patient.unitcode NOT IN %s AND
            startdate is not NULL AND
            startdate != '0000-00-00 00:00:00'
    """ % EXCLUDED_UNITS))

    for row in rows:
        new_conn.execute(
            tables.medications.insert(),
            patient_id=row['radarNo'],
            source_group_id=m.get_hospital_id(row['unitcode']),
            source_type=m.ukrdc_source_type,
            from_date=row['startdate'],
            to_date=row['enddate'],
            drug_text=row['name'],
            dose_text=row['dose'],
            created_user_id=m.user_id,
            modified_user_id=m.user_id,
        )


@click.command()
@click.argument('src')
@click.argument('dest')
def cli(src, dest):
    src_engine = create_engine(src)
    dest_engine = create_engine(dest)

    src_conn = src_engine.connect()
    dest_conn = dest_engine.connect()

    with dest_conn.begin():
        migrate_medications(src_conn, dest_conn)


if __name__ == '__main__':
    cli()
