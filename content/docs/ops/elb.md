---
menu:
  docs:
    parent: operations
title: ELB termination
---

Currently, we are fronting Cloud Foundry apps with an Elastic Load Balancer (ELB) in the Cloud Foundry VPC. The ELB terminates HTTPS, and forwards HTTP traffic within the VPC.

ELBs need to be created directly through the AWS console or API, not using `cf` commands.

### Creating and uploading the HTTPS certificate

Go get a HTTPS certificate using [18F's standard  process](https://github.com/18F/https), and follow the instructions there to [upload the key and certificate to the AWS ELB](https://github.com/18F/https#in-an-elb).

The name you set as part of the ELB certificate upload command will be used later.

### Creating the ELB with CloudFormation

Use [this CloudFormation JSON template](https://github.com/18F/cloud-foundry-manifests/blob/master/provisioning/elb.json) to create the ELB, filling in parameters as needed.

* **CertName**: Pick the name of the HTTPS certificate you've uploaded.
* **ClientTag**: The value that corresponds to your project's assigned billing tag. **This is mandatory.**
* **ELBSecGroups**: Select the security groups. (See [`create-elb.sh`](https://github.com/18F/DevOps/blob/master/cf/create-elb.sh) for current information.)
* **ELBSubnets**: Select the subnets. (See [`create-elb`](https://github.com/18F/DevOps/blob/master/cf/create-elb.sh) for current information.)
* **HostedZoneName**: Type in the name of the hosted zone, e.g. `open.foia.gov`.
* **ZoneName**: Type in the name of the subdomain in front of the hosted zone domain, if one applies.
t

### Creating the ELB by hand

The CloudFormation JSON above is built to represent the following workflow:

* Create a new ELB in `us-east-1` (N. Virginia).

* Pick a name, and select the `CloudFoundry-live` VPC. Select HTTPS for the Load Balancer protocol, and HTTP for the Instance protocol.

* Select the HTTPS certificate that corresponds to the domain name being used for the ELB. Find it by the name you selected when you uploaded the certificate and key.

* Pick whatever health check makes sense (usually `/`).

* Select subnets. (See [`create-elb`](https://github.com/18F/DevOps/blob/master/cf/create-elb.sh) for current information.)

* Select security groups. (See [`create-elb`](https://github.com/18F/DevOps/blob/master/cf/create-elb.sh) for current information.)

* Choose which instance to point the Load Balancer to. (See [`create-elb`](https://github.com/18F/DevOps/blob/master/cf/create-elb.sh) for current information.)

* At the tag screen, **you must tag the ELB** with a tag named `client`, with the value that **corresponds to your project's assigned billing tag**.
