---
parent: runbook
layout: ops

layout: docs
sidenav: true
title: Importing Credentials to Credhub
---

These instructions lay out the process and guidelines for importing existing credentials into Credhub.  Credhub has a bulk-import feature for adding existing credentials to Credhub.  The credentials must be added to a yml file that specifies the name, type, and credential value.  These instructions are to make this process less painful.

## Install Pivotal "vars-to-creds" CLI
Follow the instructions [here] (https://github.com/pivotalservices/vars-to-credhub) to install the CLI provided by Pivotal.  

## Import procedure
Download the pertinent file that contains the credentialss for a deployment from the S3 bucket.  If we were importing the credentials for dev bosh these are the steps needed for an import:

```sh
./vars-to-credhub --prefix /bosh/development --vars-file development-bosh.yml > dev-bosh-import.yml
```
Inspect the values generated in `dev-bosh-import.yml`.  Verify that the credential types are correct.

Now target and login to the corresponding credhub that needs the credentials.  Run the following command:

```sh
credhub import --file `dev-bosh-import.yml`
```
