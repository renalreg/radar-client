from sqlalchemy import text, create_engine
import click

from radar_migration import Migration, tables


def migrate_patient_aliases(old_conn, new_conn):
    m = Migration(new_conn)

    rows = old_conn.execute(text("""
        SELECT
          b.radarNo,
          a.surnameAlias
        FROM patient AS a
        JOIN patient AS b ON a.nhsno = b.nhsno
        WHERE
            b.radarNo is not NULL AND
            a.surnameAlias is not NULL AND
            a.surnameAlias != '-' AND
            a.sourceType = 'Radar'
    """))

    for row in rows:
        new_conn.execute(
            tables.patient_aliases.insert(),
            patient_id=row['radarNo'],
            data_source_id=m.data_source_id,  # TODO
            last_name=row['surnameAlias'],
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

    migrate_patient_aliases(src_conn, dest_conn)


if __name__ == '__main__':
    cli()
