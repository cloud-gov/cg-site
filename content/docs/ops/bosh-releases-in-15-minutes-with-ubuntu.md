---
menu:
  docs:
    parent: deployment
title: Become a BOSH Developer in 15 Minutes using Ubuntu
linktitle: Ubuntu
---

# How to Become a BOSH Developer in 15 Minutes
The following describes how to start from a clean Ubuntu 14.04 install, and results in a Vagrant BOSH-lite instance running on top of VirtualBox.  This can be done both graphically, or through SSH exclusively.

### Install Ubuntu Dependencies
First install a few required packages from the Ubuntu repositories.  This guide covers Ubuntu 14.04:
```shell
sudo apt update
sudo apt install build-essential git-core curl zlib1g-dev libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties -y
```

### Install VirtualBox
VirtualBox will be used to create virtual machines on our Ubuntu system, which have a few advantages such as allowing us to use Vagrant boxes and not writing files to the operating system drive:
```shell
curl -O http://download.virtualbox.org/virtualbox/5.1.12/virtualbox-5.1_5.1.12-112440~Ubuntu~trusty_amd64.deb
sudo dpkg -i virtualbox-5.1_5.1.12-112440~Ubuntu~trusty_amd64.deb
```

### Install Vagrant
Vagrant provides easy commands to start and manage virtual machine configuration:
```
curl -O https://releases.hashicorp.com/vagrant/1.9.1/vagrant_1.9.1_x86_64.deb
sudo dpkg -i vagrant_1.9.1_x86_64.deb
```

### Install rbenv
It is recommended to install Ruby using [rbenv](https://github.com/rbenv/rbenv), which supports multiple parallel ruby installs and keeps all applications from needing to use a single Gem path / specific version.
```shell
cd ~
git clone git://github.com/sstephenson/rbenv.git .rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec $SHELL

git clone git://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL
```

### Install Ruby 2.3.1
Ruby is used for several tools including the BOSH CLI and Vagrant:
```shell
rbenv install 2.3.1
rbenv global 2.3.1
echo "gem: --no-ri --no-rdoc" > ~/.gemrc
```

### Install BOSH CLI
BOSH has a command line client and a server it connects to.  To install the client, which will be the primary interface to BOSH: 
```shell
gem install bosh_cli --no-ri --no-rdoc
```

This client can speak with both BOSH lite and regular BOSH servers.

### Install BOSH Lite
BOSH Lite provides a lightweight BOSH director running on a Vagrant VirtualBox instance.
```shell
mkdir $HOME/workspace
cd $HOME/workspace
git clone https://github.com/cloudfoundry/bosh-lite
cd bosh-lite
vagrant up
```

### Connect to BOSH Lite
Configure the BOSH command line client to connect to the new director running in Vagrant.  The default username is `admin` and password is `admin`:
```shell
bosh target 192.168.50.4 lite
```

### Add Routes
The VirtualMachine is up and will create containers to service our BOSH requests.  In order for these containers to communicate with the network, a route needs to be added:

```shell
sudo ./bin/add-route
```

### Inspect the Director
The director is up and running and can be inspected to review the configuration.  Currently the director is empty since nothing has been configured or uploaded:
```shell
bosh releases
bosh stemcells
bosh deployments
```

### Upload a Release
[cg-secureproxy-boshrelease](https://github.com/18F/cg-secureproxy-boshrelease) is a BOSH release the cloud.gov team maintains and is a good example.  Clone the release, create a BOSH release and upload it to the director:
```shell
cd $HOME/workspace
git clone https://github.com/18F/cg-secureproxy-boshrelease.git
bosh create release
bosh upload release
```

### Upload a Stemcell
There is now a `secureproxy` BOSH release, but a operating system is needed to run it on.  These images are called `stemcells` and can be found at [bosh.io](https://bosh.io/stemcells):
```shell
cd $HOME/workspace
curl -O https://s3.amazonaws.com/bosh-core-stemcells/warden/bosh-stemcell-3312.12-warden-boshlite-ubuntu-trusty-go_agent.tgz
bosh upload stemcell ./bosh-stemcell-3312.12-warden-boshlite-ubuntu-trusty-go_agent.tgz
```

### Create a Deployment
There is now a `secureproxy` BOSH release and a `Ubuntu Trusty` stemcell.  A deployment manifest tells the director which combination of releases, jobs and stemcells need to be deployed.  Each release usually contains a sample deployment manifest or tool to generate one:
```shell
cd $HOME/workspace/cg-secureproxy-boshrelease/templates
./make_manifest warden
```

### Set Required Parameters
Look at the manifest (by default located at `$HOME/workspace/cg-secureproxy-boshrelease/tmp/secureproxy-warden-manifest.yml`) and find the line which starts with `properties:` and add a secureproxy section with `listen_port` and `proxy_port`.  Since this is an example these won't be actually used, so lets just use 9292 and 9293 for now:
```
properties:
  secureproxy:
      listen_port: 9292
          proxy_port: 9293
```

To see all of the variables a release might use, locate the spec file which describes required, optional, and defaults (ex `$HOME/workspace/cg-secureproxy-boshrelease/jobs/secureproxy/spec`)

### Deploy the Manifest
There is now a BOSH secureproxy release, Ubuntu stemcell, and secureproxy deployment manifest.  To deploy the manifest:
```shell
bosh deploy
```

### The Job is Running
The secureproxy job is now running and proxying requests between `listen_port` and `proxy_port`.  To inspect the state of the director:
```shell
bosh releases
bosh stemcells
bosh deployments
bosh vms
```

