import binascii
import os
import re
from pkg_resources import parse_version

from fabric.api import task, put, run, cd


@task
def deploy(archive=None, name='radar-client'):
    if archive is None:
        archive = sorted(filter(lambda x: x.endswith('.tar.gz'), os.listdir('.')), key=parse_version)[-1]

    version = re.search('-([^-]+)\.tar\.gz$', archive).group(1)
    current_version = '/srv/{name}/current'.format(name=name)
    new_version = '/srv/{name}/{version}'.format(name=name, version=version)

    randomstr = binascii.hexlify(os.urandom(20)).decode('utf-8')
    tmp = '/tmp/radar-{0}'.format(randomstr)

    run('mkdir {0}'.format(tmp))
    remote_archive = '{0}/radar-client.tar.gz'.format(tmp)
    put(archive, remote_archive)

    run('rm -rf {0} && mkdir -p {0}'.format(new_version))

    with cd(new_version):
        run('tar --strip-components=1 -xzf {}'.format(remote_archive))

    run('ln -sfn {0} {1}'.format(new_version, current_version))
    run('rm -rf {0}'.format(tmp))
