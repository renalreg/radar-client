import binascii
import os
import re

from fabric import task

from pkg_resources import parse_version


@task
def deploy(c, archive=None, name='radar-client'):
    if archive is None:
        archive = sorted(
          filter(
            lambda x: x.endswith('.tar.gz'),
            os.listdir('.')
          ),
          key=parse_version
        )[-1]

    version = re.search(r'-([^-]+)\.tar\.gz$', archive).group(1)
    current_version = '/srv/{name}/current'.format(name=name)
    new_version = '/srv/{name}/{version}'.format(name=name, version=version)

    randomstr = binascii.hexlify(os.urandom(20)).decode('utf-8')
    tmp = '/tmp/radar-client-{0}'.format(randomstr)

    c.run('mkdir {0}'.format(tmp))
    remote_archive = '{0}/radar-client.tar.gz'.format(tmp)

    c.put(archive, remote_archive)
    c.run('rm -rf {0} && mkdir -p {0}'.format(new_version))

    c.run('tar --strip-components=1 -xzf {} -C {}'.format(remote_archive, new_version))

    c.run('ln -sfn {0} {1}'.format(new_version, current_version))
    c.run('rm -rf {0}'.format(tmp))
