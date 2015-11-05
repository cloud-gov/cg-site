---
menu:
  main:
    parent: ops
title: Creating a local dev environment with Virtual Box
weight: 10
---

BOSH Lite is designed to provide a local development environment for BOSH and by extension Cloud Foundry. BOSH Lite will be used run locally via Virtualbox. This guide is primarily concerned with bringing up a single-instance environment VB.

### Prerequisites:

1. [Vagrant]({{< relref "#vagrant" >}})
1. [Virtual Box]({{< relref "#virtual-box" >}})
1. [Docker]({{< relref "#docker" >}})
1. [Git]({{< relref "#git" >}})
1. [Cloud Foundry CLI]({{< relref "#cloud-foundry-cli" >}})


##### Vagrant

The bosh-lite repo provides a Vagrantfile and VM for quickly standing up a bosh lite director on VBox.

	brew install vagrant
 	vagrant plugin install vagrant-berkshelf
 	vagrant plugin install vagrant-omnibus

Note: If that fails goto http://www.vagrantup.com/downloads and install from web

##### Virtual Box

While not strictly necessary, but this guide assumes a recent version is installed. Install or update it from:

	https://www.virtualbox.org/wiki/Downloads

##### Docker

We need to install Docker. It will be used to build the cflinuxfs2.tar.gz. Install or update with the following:

	brew install docker

Additional info on Docker OSX installation can be found here https://docs.docker.com/installation/mac/

##### Git

Needed to clone the bosh-lite repo.

	brew install git

##### Cloud Foundry CLI

The `cf` command is our gateway to the Cloud Foundry environment, it handles everything from the creation of users and organizations to pushing and scaling applications.

	brew tap pivotal/tap
	brew install cloudfoundry-cli


### Procedure:

##### Prepare Vagrant

Grab the bosh-lite repo.

	git clone https://github.com/cloudfoundry/bosh-lite.git
	cd bosh-lite

Add the bosh-lite vagrant box.

	vagrant box add cloudfoundry/bosh-lite

Choose option 2 for Virtualbox.

##### Launch Vagrant

Bring the vagrant machine up.

	vagrant up

The initial `vagrant up` includes provisioning scripts which set up port forwarding rules via iptables to expose Cloud Foundry service VMs running as warden containers on the instance.  If the machine is restarted or halted for any reason we’ll need to follow the steps in [reprovisioning]({{< relref "#reprovisioning" >}}) below.

##### Finish Building the Virtualbox Instance:

Connect to the VBox instance via SSH.

	vagrant ssh

There are a few utilities that we'll need to configure the Cloud Foundry environment which aren't included with the BOSH Lite public AMI.

	sudo apt-get update && sudo apt-get -y install git unzip

Add the spiff utility.

	wget https://github.com/cloudfoundry-incubator/spiff/releases/download/v1.0.3/spiff_linux_amd64.zip
	sudo unzip spiff_linux_amd64.zip -d /usr/local/bin

Create a workspace directory.

	mkdir workspace
	cd workspace

Target the local bosh director.

	bosh target 127.0.0.1

Clone the bosh bosh-lite and cf-release repository.

	git clone https://github.com/cloudfoundry/bosh-lite.git
 	git clone https://github.com/cloudfoundry/cf-release.git
 	sudo mkdir -p ~/workspace/cf-release/blobs/rootfs	#needed for later step with docker
	cd bosh-lite

##### Configure Cloud Foundry:

With VirtualBox the domain will be tied to the localhost and will always be:
	...
	domain: api.bosh-lite.com
	...

##### Provision Cloud Foundry:

Add some dependency packages for the provisioning tool

	sudo apt-get install ruby
	sudo gem install bundle
	sudo apt-get install curl

Run the automated provisioning script.

	sudo ./bin/provision_cf

This script automates the process of:

1. Uploading the latest release to the director.
2. Uploading a public stemcell (latest-bosh-stemcell-warden.tgz) to the director.
3. Generating a deployment manifest from the included templates.
4. Deploying the generated manifest to a set of warden containers inside the instance.

This process takes about 20 minutes.

When complete, use bosh vms to have a look at the resulting environment.

	ubuntu@agent-id-bosh-0:~/workspace/bosh-lite$ bosh vms

	Deployment `cf-warden'

	Director task #

	Task # done

	+------------------------------------+---------+---------------+--------------+
	| Job/index                          | State   | Resource Pool | IPs          |
	+------------------------------------+---------+---------------+--------------+
	| api_z1/0                           | running | large_z1      | 10.244.0.138 |
	| etcd_z1/0                          | running | medium_z1     | 10.244.0.42  |
	| ha_proxy_z1/0                      | running | router_z1     | 10.244.0.34  |
	| hm9000_z1/0                        | running | medium_z1     | 10.244.0.142 |
	| loggregator_trafficcontroller_z1/0 | running | small_z1      | 10.244.0.150 |
	| loggregator_z1/0                   | running | medium_z1     | 10.244.0.146 |
	| login_z1/0                         | running | medium_z1     | 10.244.0.134 |
	| nats_z1/0                          | running | medium_z1     | 10.244.0.6   |
	| postgres_z1/0                      | running | medium_z1     | 10.244.0.30  |
	| router_z1/0                        | running | router_z1     | 10.244.0.22  |
	| runner_z1/0                        | running | runner_z1     | 10.244.0.26  |
	| uaa_z1/0                           | running | medium_z1     | 10.244.0.130 |
	+------------------------------------+---------+---------------+--------------+

	VMs total: 12


We're done provisioning, now we'll disconnect and access the environment via the Cloud Foundry CLI.

	ubuntu@agent-id-bosh-0:exit 			#exit Vagrant SSH
	~/<host_working_folder>/bosh-lite/bin/add-route


#### Create and copy a blob into the vagrant image

	vagrant plugin install vagrant-scp
	cd ~/<host_working_folder>/

Now Docker must be installed and running on your Mac for the next procedure to work. Launch into a docker terminal to create the cflinuxfs2 container. 

	git clone https://github.com/cloudfoundry/stacks.git
	cd stacks
	make
	
Secure copy the cflinuxfs2 container to the CF VM.

	vagrant scp ~/<host_working_folder>/stacks/cflinuxfs2.tar.gz default:/home/vagrant/workspace/cf-release/blobs/rootfs

#### Initial Cloud Foundry Configuration:

Connect using the Cloud Foundry CLI.

	cf api --skip-ssl-validation https://api.bosh-lite.com
	cf auth admin admin

**Note:** This step will fail with a 500 error if the VMs cannot reach each other via `https://api.bosh-lite.com`.

Verify deployment

	Create and target an organization.

		cf create-org MY-ORGANIZATION
		cf target -o MY-ORGANIZATION

	Create and target a space.

		cf create-space MY-SPACE
		cf target -s MY-SPACE


##### Reprovisioning:

If the Vagrant machine is halted or restarted for any reason there are  several steps we'll need to take to recreate the environment.

1.) Recreate forwarding rules.

	vagrant up
 	vagrant provision

2.) Repair the VMs.

	bosh cck cf-warden
	$BOSH-LITE-WORKING-DIRECTORY/bin/add-route

Choose option 2 "Recreate VM" for each VM (M of N) then confirm the choices. A new director task will be created to recreate each VM in turn. This will take several minutes to complete. Use >bosh vms to have a look at the resulting environment.

  	bosh vms 		# verify that service is up
  	~/<host_working_folder>/bosh-lite/bin/add-route



Original steps found here: https://github.com/cloudfoundry/bosh-lite

Original Cloud Foundry installation with BOSH details are here if BOSH-LITE ./scripts/provision_cf script is not used: http://docs.cloudfoundry.org/deploying/boshlite/deploy_cf_boshlite.html
