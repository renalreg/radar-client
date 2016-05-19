import os
import re

from fabric.api import task, put, run, cd


@task
def deploy(archive=None, name='radar-client'):
    if archive is None:
        # Use the latest archive by default
        archive = sorted(x for x in os.listdir('.') if x.endswith('.tar.gz'))[-1]

    version = re.search('-([^-]+)\.tar\.gz$', archive).group(1)
    current_version = '/srv/{name}/current'.format(name=name)
    new_version = '/srv/{name}/{version}'.format(name=name, version=version)

    tmp = '/tmp/deploy-{0}'.format(os.urandom(20).encode('hex'))
    run('mkdir {0}'.format(tmp))
    remote_archive = '{0}/radar-client.tar.gz'.format(tmp)
    put(archive, remote_archive)

    run('rm -rf {0} && mkdir -p {0}'.format(new_version))

    with cd(new_version):
        run('tar --strip-components=1 -xzf {}'.format(remote_archive))

    run('ln -sfn {0} {1}'.format(new_version, current_version))
    run('rm -rf {0}'.format(tmp))
