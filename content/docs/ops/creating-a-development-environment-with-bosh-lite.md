---
menu:
  docs:
    parent: deployment
title: Creating a Dev Environment on AWS
linktitle: AWS
---

BOSH Lite is designed to provide a local development environment for BOSH and by extension Cloud Foundry. Though BOSH Lite can be run locally via Virtualbox, this guide is primarily concerned with bringing up a single-instance environment on Amazon EC2.

### Prerequisites:

1. [Vagrant]({{< relref "#vagrant" >}})
1. [AWS CLI]({{< relref "#aws-cli" >}})
1. [Git]({{< relref "#git" >}})
1. [Cloud Foundry CLI]({{< relref "#cloud-foundry-cli" >}})
1. [Bosh IAM User]({{< relref "#bosh-iam-user" >}})
1. [Bosh EC2 Security Group]({{< relref "#bosh-ec2-security-group" >}})

##### Vagrant

The bosh-lite repo provides a Vagrantfile and box for quickly standing up a bosh lite director on AWS.

	brew install vagrant
	vagrant plugin install vagrant-aws

##### AWS CLI

(Amazon Web Services Command Line Interface)

While not strictly necessary, but this guide assumes a recent version it. Install or update it with:

	sudo pip install awscli -U

##### Git

Needed to clone the bosh-lite repo.

	brew install git

##### Cloud Foundry CLI

The `cf` command is our gateway to the Cloud Foundry environment, it handles everything from the creation of users and organizations to pushing and scaling applications.

	brew tap pivotal/tap
	brew install cloudfoundry-cli


##### Bosh IAM User

You'll need a recent version of the AWS CLI for some of these commands. The current release is 1.7.12 as of this writing. Earlier versions may not have all the required commands.

1. Create the bosh user.

		aws iam create-user --user-name bosh

1. Apply a policy that will allow bosh to perform actions in the AWS environment.

		aws iam attach-user-policy --user-name bosh --policy-arn 'arn:aws:iam::aws:policy/AmazonEC2FullAccess'

1. Create the bosh keypair.

		aws ec2 create-key-pair --key-name bosh --query 'KeyMaterial' --output text > bosh.pem

1. Create the bosh access key and secret key.

		aws iam create-access-key --user-name bosh

1. Export the required environment variables using key file and credentials create above.

	This is the path to the private portion of the bosh keypair (bosh.pem).

		export BOSH_LITE_KEY_PATH=/path/to/bosh.pem

	This is AWS access key to be used by bosh.

		export BOSH_AWS_ACCESS_KEY_ID=YOUR-AWS-ACCESS-KEY

	This is AWS secret key to be used by bosh.

		export BOSH_AWS_SECRET_ACCESS_KEY=YOUR-AWS-SECRET-KEY

##### Bosh EC2 Security Group

A EC2 security group which allows SSH and HTTP/S into your AWS environment:

Again the AWS CLI is nice to have here.

1. Create the security group. By default, the bosh-lite Vagrantfile expects this security group to be named inception.  You can call it something else, but you'll need to make the new name available to vagrant with `export BOSH_LITE_SECURITY_GROUP=NEW-SECURITY-GROUP-NAME`.

		aws ec2 create-security-group --group-name inception --description 'Access to Cloud Foundry.'

1. Add your own public IP at minimum.

		aws ec2 authorize-security-group-ingress --group-name bosh-inception --protocol tcp --port 22 --cidr $(curl icanhazip.com)/32

With the prerequisites out of the way, we can use Vagrant to deploy the instance which will run the BOSH Lite directory and wardenized Cloud Foundry services.

### Procedure:

##### Prepare Vagrant

Grab the bosh-lite repo.

	git clone https://github.com/cloudfoundry/bosh-lite.git
	cd bosh-lite

Add the bosh-lite vagrant box.

	vagrant box add cloudfoundry/bosh-lite

##### Launch Vagrant

Bring the vagrant machine up.

	vagrant up

The initial `vagrant up` includes provisioning scripts which set up port forwarding rules via iptables to expose Cloud Foundry service VMs running as warden containers on the instance.  If the machine is restarted or halted for any reason we’ll need to follow the steps in [reprovisioning]({{< relref "#reprovisioning" >}}) below.

Grab the public IP of the resulting instance and keep it handy. We’ll need it later in the deployment and when accessing the resulting environment with the Cloud Foundry CLI.

	aws ec2 describe-instances \
	--instance-id $(cat .vagrant/machines/default/aws/id) \
	--query 'Reservations[0].Instances[0].PublicIpAddress'

##### Finish Building the EC2 Instance:

Connect to the AWS instance via SSH.

	vagrant ssh

There are a few utilities that we'll need to configure the Cloud Foundry environment which aren't included with the BOSH Lite public AMI.

	sudo apt-get update && apt-get -y install git unzip

Add the spiff utility.

	wget https://github.com/cloudfoundry-incubator/spiff/releases/download/v1.0.7/spiff_linux_amd64.zip
	unzip spiff_linux_amd64.zip -d /usr/local/bin

Create a workspace directory.

	mkdir workspace
	cd workspace

Target the local bosh director.

	bosh target 127.0.0.1

Clone the bosh bosh-lite repo.

	git clone https://github.com/cloudfoundry/bosh-lite.git
	cd bosh-lite

##### Configure Cloud Foundry:

Update the deployment stub to reflect the public IP of your instance as recorded above by adding a `domain:` key to the properties section of `manifests/cf-stubb-spiff.yml`. The resulting file  should look something like this:

	...
	properties:
	  domain: INSTANCE-PUBLIC-IP.xip.io
	...

Ensure the Cloud Foundry services will be able to access each other via the external address.

	aws ec2 authorize-security-group-ingress --group-name bosh-inception --protocol tcp --port 0-65536 --cidr INSTANCE-PUBLIC-IP/32

##### Provision Cloud Foundry:

Run the automated provisioning script.

	sudo ./bin/provision_cf

This script automates the process of:

1. Recursively cloning the cf-release repository.
2. Uploading the latest release to the director.
3. Uploading a public stemcell to the director.
4. Generating a deployment manifest from the included templates.
5. Deploying the generated manifest to a set of warden containers inside the instance.

This process takes quite a while, up to an hour on the default `m3.xlarge` instance type.

When complete, use bosh vms to have a look at the resulting environment.

	ubuntu@agent-id-bosh-0:~/workspace/bosh-lite$ bosh vms

	Deployment 'cf-warden'

	Director task 4

	Task 4 done

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

##### Reprovisioning:

If the Vagrant machine is halted or restarted for any reason there are  several steps we'll need to take to recreate the environment.

1.) Recreate forwarding rules.

	vagrant provision

2.) Repair the VMs.

	bosh cck cf-warden

Choose option 2 "Recreate VM using last known apply spec" for each VM then confirm the choices. A new director task will be created to recreate each VM in turn. This will take several minutes to complete.

3.) If necessary, re-deploy using the new public IP address.

Update `manifests/cf-stub-spiff.yml` to reflect the new public IP address, then run:

	./bin/make_manifest_spiff
	bosh deploy

If the machine will be regularly restarted, consider associating an elastic IP to avoid having to repeat the third step above.

#### Initial Cloud Foundry Configuration:

Connect using the Cloud Foundry CLI.

	cf api --skip-ssl-validation https://api.INSTANCE-PUBLIC-IP.xip.io
	cf auth admin admin

**Note:** This step will fail with a 500 error if the VMs cannot reach each other via `https://xyz.INSTANCE-PUBLIC-IP.xip.io`.

Create and target an organization.

	cf create-org MY-ORGANIZATION
	cf target -o MY-ORGANIZATION

Create and target a space.

	cf create-space MY-SPACE
	cf target -s MY-SPACE
