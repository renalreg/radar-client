import os
import re

from fabric.api import task, put, run, cd


@task
def deploy(archive=None, name='radar-client'):
    if archive is None:
        # Use the latest archive by default
        archive = sorted(x for x in os.listdir('.') if x.endswith('.tar.gz'))[-1]

    version = re.search('-([^-]+)\.tar\.gz$', archive).group(1)

    remote_archive = '/tmp/{name}.tar.gz'.format(name=name)
    put(archive, remote_archive)

    current_version = '/srv/{name}/current'.format(name=name)
    new_version = '/srv/{name}/{version}'.format(name=name, version=version)

    run('rm -rf {0} && mkdir -p {0}'.format(new_version))

    with cd(new_version):
        run('tar --strip-components=1 -xzf {}'.format(remote_archive))

    run('ln -sfn {0} {1}'.format(new_version, current_version))
    run('rm -rf {0}'.format(remote_archive))
