import os
import re

from fabric.api import task, put, run, cd


@task
def deploy(archive=None, name='radar-client'):
    if archive is None:
        # Use the latest archive by default
        archive = sorted(x for x in os.listdir('.') if x.endswith('.tar.gz'))[-1]

    version = re.search('-([^-]+)\.tar\.gz$', archive).group(1)

    tmp_archive_path = '/tmp/{}.tar.gz'.format(name)
    put(archive, tmp_archive_path)

    current_version = '/srv/{name}/current'.format(name=name)
    new_version = '/srv/{name}/{version}'.format(name=name, version=version)

    run('rm -rf {0} && mkdir -p {0}'.format(new_version))

    with cd(new_version):
        run('tar --strip-components=1 -xzf {}'.format(tmp_archive_path))

    run('ln -sfn {0} {1}'.format(new_version, current_version))
    run('rm -rf {0}'.format(tmp_archive_path))

