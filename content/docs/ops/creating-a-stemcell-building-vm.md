---
menu:
  docs:
    parent: deployment
title: Creating a stemcell building VM
---
How to create a vagrant machine on AWS for building new bosh stemcells.

#### Prerequisites

Vagrant with the vagrant-aws, vagrant-berkshelf and vagrant-omnibus plugins.

	brew install vagrant
	vagrant plugin install vagrant-berkshelf
	vagrant plugin install vagrant-omnibus
	vagrant plugin install vagrant-aws

The AWS CLI (Amazon Web Services Command Line Interface) is not strictly necessary, but this guide assumes a recent version it. Install or update it with:

	sudo pip install awscli -U

Git.

 	brew install git

#### Procedure

###### Create a user, keypair and access keys for use by bosh.

You'll need a recent version of the AWS CLI for some of these commands. The current release is 1.7.12 as of this writing. Earlier versions may not have all the required commands.

Create the bosh user.

	aws iam create-user --user-name bosh

Apply a policy that will allow bosh to perform actions in the AWS environment.

	aws iam attach-user-policy --user-name bosh --policy-arn 'arn:aws:iam::aws:policy/AmazonEC2FullAccess'

Create the bosh keypair.

	aws ec2 create-key-pair --key-name bosh --query 'KeyMaterial' --output text > bosh.pem

Create the bosh access key and secret key.

	aws iam create-access-key --user-name bosh

Export the required environment variables using key file and credentials create above.

This is the path to the private portion of the bosh keypair (bosh.pem).

	export BOSH_KEY_PATH=/path/to/bosh.pem

This is AWS access key to be used by bosh.


	export BOSH_AWS_ACCESS_KEY_ID=ABCDEFGHIJKLMNOPQRST

This is AWS secret key to be used by bosh.

	export BOSH_AWS_SECRET_ACCESS_KEY=abcdefghijklmnopqrstuvwxyz0123456789abcd

###### Create a bosh-stemcell security group which allows SSH in your AWS environment.

Again the AWS CLI is nice to have here.

Create the security group.

	aws ec2 create-security-group --group-name bosh-stemcell --description 'SSH access to the bosh stemcell creation VM.'

Add your own public IP at minimum.

	aws ec2 authorize-security-group-ingress --group-name bosh-stemcells --protocol tcp --port 22 --cidr $(curl icanhazip.com)/32

#### Building the VM

###### Clone the bosh repo.

	git clone --recursive https://github.com/cloudfoundry/bosh.git

We’re cloning recursively to include the bosh-agent repo as a submodule. Otherwise, the `vagrant up` step may fail with the following error.

	vm:
	* The host path of the shared folder is missing: ../.git/modules

Add the vagrant box needed to launch replacing `bosh-stemcell-937f30` with the current release specified in `Vagrantfile` if necessary.

	vagrant box add --name bosh-stemcell-937f30 https://bosh-jenkins-artifacts.s3.amazonaws.com/bosh-vagrant-boxes/bosh-stemcell-937f30-aws.box

Otherwise, the [vagrant up]({{< relref "#build-the-stemcell-builder-vm" >}}) step below may fail with the error.

	AWS Provider:
	* vagrant_aws.config.ami_required

###### Build the Stemcell Builder VM

With the environment prepared we can finally launch the stemcell building VM.

	vagrant up remote --provider=aws

The build process takes a while, during the writing of this guide, the build required 12 minutes.

Confirm that the remote VM is up and running with vagrant status.

#### Using the VM

###### Build a Stemcell

With the stemcell builder VM operational we can now start building stemcells.

	vagrant ssh -c '
	  cd /bosh
	  bundle exec rake stemcell:build_os_image[ubuntu,trusty,/tmp/ubuntu_base_image.tgz]
	' remote
