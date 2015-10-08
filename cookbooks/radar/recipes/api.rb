include_recipe 'radar::python'

name = 'radar-api'
root_path = "/opt/#{name}"
python_path = "#{root_path}/bin/python.sh"
venv_path = "#{root_path}/venv"
venv_python_path = "#{venv_path}/bin/python.sh"
conf_path = "/etc/#{name}"

directory root_path do
  owner 'radar'
  group 'radar'
  mode '00755'
  action :create
end

directory "#{root_path}/bin" do
  owner 'radar'
  group 'radar'
  mode '00755'
  action :create
end

template python_path do
  source 'python.sh.erb'
  owner 'radar'
  group 'radar'
  mode '00755'
  action :create
end

virtualenv venv_path do
  python_path python_path
  owner 'radar'
  group 'radar'
  packages 'gunicorn' => '19.3.0',
           'supervisor' => '3.1.3'
  action :create
end

execute 'pip install -r requirements.txt' do
  command "#{venv_python_path} -m pip install -r /home/radar/src/requirements.txt"
  user 'radar'
  group 'radar'
  environment 'PATH' => '/usr/pgsql-9.4/bin:/usr/bin:/bin'
  action :run
end

execute 'pip install --editable .' do
  command "#{venv_python_path} -m pip install --editable /home/radar/src"
  user 'radar'
  group 'radar'
  not_if "#{venv_python_path} -m pip freeze | grep radar"
  action :run
end

directory conf_path do
  owner 'radar'
  group 'radar'
  mode '00755'
  action :create
end

template "#{conf_path}/settings.py" do
  source 'api/settings.py.erb'
  user 'radar'
  group 'radar'
  mode '00644'
  action :create
end

template "#{conf_path}/supervisord.conf" do
  source 'api/supervisord.conf.erb'
  user 'root'
  group 'root'
  mode '00644'
  notifies :restart, "service[#{name}]"
  action :create
end

template "#{conf_path}/gunicorn.py" do
  source 'api/gunicorn.py.erb'
  user 'root'
  group 'root'
  mode '00644'
  notifies :restart, "service[#{name}]"
  action :create
end

template "/etc/init.d/#{name}" do
  source 'api/init.erb'
  user 'root'
  group 'root'
  mode '00755'
  notifies :restart, "service[#{name}]"
  action :create
end

service name do
  action [:enable, :start]
end