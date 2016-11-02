---
menu:
  docs:
    parent: deployment
title: Creating a Local Dev Environment With VirtualBox
linktitle: Local
---

BOSH Lite is designed to provide a local development environment for BOSH and by extension Cloud Foundry. BOSH Lite will be used run locally via Virtualbox. This guide is primarily concerned with bringing up a single-instance environment VB.

To create a local environment you need to follow the instructions from the Cloud Foundry documentation: http://docs.cloudfoundry.org/deploying/boshlite/index.html.


If you need the spiff utility, install it by running:

	# For Mac OS X
	wget https://github.com/cloudfoundry-incubator/spiff/releases/download/v1.0.7/spiff_darwin_amd64.zip
	sudo unzip spiff_darwin_amd64.zip -d /usr/local/bin

	# For Linux
	wget https://github.com/cloudfoundry-incubator/spiff/releases/download/v1.0.7/spiff_linux_amd64.zip
	sudo unzip spiff_linux_amd64.zip -d /usr/local/bin


##### Configure Cloud Foundry:

With VirtualBox the domain will be tied to the localhost and will always be:
	...
	domain: api.bosh-lite.com
	...

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


##### Troubleshooting:

- If you are having networking issues make sure to run: `bin/add-route`.
- If you restarted your VM you might need to run `bosh cck cf-warden` to ensure the cluster is running properly.
- If the CF cluster is unresponsive you can tear it off by destroying the cluster and following the instructions [here](http://docs.cloudfoundry.org/deploying/boshlite/create_a_manifest.html) again

	vagrant destroy
	vagrant up
	bosh target 192.168.50.4 lite
	bosh deploy
